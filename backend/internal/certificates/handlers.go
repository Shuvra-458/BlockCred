package certificates

import (
	"blockcred-backend/internal/blockchain"
	"blockcred-backend/internal/ipfs"
	"crypto/sha256"
	"encoding/hex"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
)

func Issue(c *gin.Context) {

	// 1️⃣ Get form fields
	name := c.PostForm("name")
	regNo := c.PostForm("registration_number")
	org := c.PostForm("organization")
	course := c.PostForm("course")
	marks := c.PostForm("marks")

	if name == "" || regNo == "" {
		c.JSON(400, gin.H{"error": "missing required fields"})
		return
	}

	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "certificate PDF required"})
		return
	}

	tempPath := "./tmp/" + file.Filename
	if err := c.SaveUploadedFile(file, tempPath); err != nil {
		c.JSON(500, gin.H{"error": "failed to save file"})
		return
	}
	defer os.Remove(tempPath)

	pdfCid, err := ipfs.UploadFileToIPFS(tempPath)
	if err != nil {
		log.Println("PDF upload error:", err)
		c.JSON(500, gin.H{"error": "pdf upload failed", "details": err.Error()})
		return
	}

	hash := sha256.Sum256([]byte(regNo))
	certIdHex := hex.EncodeToString(hash[:])

	meta := gin.H{
		"name":                name,
		"registration_number": regNo,
		"organization":        org,
		"course":              course,
		"marks":               marks,
		"pdf_cid":             pdfCid,
		"issued_at":           time.Now().Format(time.RFC3339),
	}

	// 7️⃣ Upload metadata JSON to IPFS
	metaCid, err := ipfs.UploadJSONToIPFS(meta)
	if err != nil {
		log.Println("JSON upload error:", err)
		c.JSON(500, gin.H{"error": "metadata upload failed", "details": err.Error()})
		return
	}

	// 8️⃣ Store metadata CID on blockchain
	if err := blockchain.IssueCertificate(certIdHex, metaCid); err != nil {
		c.JSON(500, gin.H{"error": "blockchain issue failed"})
		return
	}

	// 9️⃣ Response
	c.JSON(200, gin.H{
		"status":      "issued",
		"certId":      certIdHex,
		"metadataCid": metaCid,
		"pdfCid":      pdfCid,
	})
}

func Verify(c *gin.Context) {
	certId := c.Param("certId")

	cert, err := blockchain.VerifyCertificate(certId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "certificate not found",
		})
		return
	}
	meta, err := ipfs.FetchJSONFromIPFS(cert.IpfsCid)

	response := gin.H{
		"certId":   certId,
		"issuer":   cert.Issuer.Hex(),
		"issuedAt": time.Unix(cert.IssuedAt.Int64(), 0).Format(time.RFC3339),
		"revoked":  cert.Revoked,
		"valid":    !cert.Revoked,
		"ipfsCid":  cert.IpfsCid,
	}

	if err == nil {
		response["name"] = meta["name"]
		response["course"] = meta["course"]
		response["organization"] = meta["organization"]
	} else {
		response["name"] = "N/A"
		response["course"] = "N/A"
		response["organization"] = "N/A"
	}

	c.JSON(http.StatusOK, response)
}
