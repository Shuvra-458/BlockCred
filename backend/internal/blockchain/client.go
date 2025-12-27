package blockchain

import (
	"log"

	"github.com/ethereum/go-ethereum/ethclient"
)

func NewClient() *ethclient.Client {
	client, err := ethclient.Dial(RPC_URL)
	if err != nil {
		log.Fatal("Failed to connect to Ethereum:", err)
	}
	return client
}
