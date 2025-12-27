package certificates

import (
	"blockcred-backend/internal/blockchain"
	"blockcred-backend/internal/ipfs"
	"crypto/sha256"
	"encoding/hex"
)

func IssueCertificateFromPDF(registrationNumber string, filePath string) (string, string, error) {

	ipfsCid, err := ipfs.UploadFileToIPFS(filePath)
	if err != nil {
		return "", "", err
	}

	hash := sha256.Sum256([]byte(registrationNumber))
	certIdHex := hex.EncodeToString(hash[:])

	if err := blockchain.IssueCertificate(certIdHex, ipfsCid); err != nil {
		return "", "", err
	}

	return certIdHex, ipfsCid, nil
}
