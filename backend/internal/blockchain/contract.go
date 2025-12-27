package blockchain

import (
	"log"
	"os"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
)

func LoadABI() abi.ABI {
	data, err := os.ReadFile("internal/blockchain/abi/CertificateRegistry.json")
	if err != nil {
		log.Fatal(err)
	}

	parsedABI, err := abi.JSON(strings.NewReader(string(data)))
	if err != nil {
		log.Fatal(err)
	}

	return parsedABI
}
