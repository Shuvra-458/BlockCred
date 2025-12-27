package blockchain

import (
	"context"
	"log"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
)

func NewTranslator(client *ethclient.Client) *bind.TransactOpts {
	privateKey, err := crypto.HexToECDSA(ISSUER_PRIV_KEY[2:])
	if err != nil {
		log.Fatal(err)
	}

	chainID, err := client.NetworkID(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	auth, err := bind.NewKeyedTransactorWithChainID(privateKey, chainID)
	if err != nil {
		log.Fatal(err)
	}

	auth.Value = big.NewInt(0)
	auth.GasLimit = uint64(3_000_000)

	return auth
}
