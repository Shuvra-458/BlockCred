package ipfs

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// FetchJSONFromIPFS fetches pinned JSON data from IPFS using a public gateway
func FetchJSONFromIPFS(cid string) (map[string]any, error) {
	resp, err := http.Get("https://gateway.pinata.cloud/ipfs/" + cid)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Content-Type guard
	if resp.Header.Get("Content-Type") != "application/json" {
		return nil, fmt.Errorf("not JSON content")
	}

	var data map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, err
	}

	return data, nil
}
