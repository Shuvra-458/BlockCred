package ipfs

import (
	"bytes"
	"encoding/json"
	"net/http"
)

func UploadJSONToIPFS(data any) (string, error) {
	payload, _ := json.Marshal(data)

	req, err := http.NewRequest(
		"POST",
		PINATA_BASE_URL+"/pinning/pinJSONToIPFS",
		bytes.NewBuffer(payload),
	)

	if err != nil {
		return "", err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+PINATA_JWT)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result struct {
		IpfsHash string `json:"IpfsHash"`
	}

	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		return "", err
	}

	return result.IpfsHash, nil

}
