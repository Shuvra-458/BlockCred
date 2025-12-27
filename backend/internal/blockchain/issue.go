package blockchain

import (
	"encoding/hex"
	"fmt"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

func IssueCertificate(certIdHex string, ipfsCid string) error {

	decoded, err := hex.DecodeString(certIdHex)
	if err != nil || len(decoded) != 32 {
		return fmt.Errorf("invalid certId")
	}

	var certID [32]byte
	copy(certID[:], decoded)

	client := NewClient()
	auth := NewTranslator(client)
	parsedABI := LoadABI()

	contractAddr := common.HexToAddress(CONTRACT_ADDR)
	contract := bind.NewBoundContract(
		contractAddr,
		parsedABI,
		client,
		client,
		client,
	)

	_, err = contract.Transact(
		auth,
		"issueCertificate",
		certID,
		ipfsCid,
	)
	if err != nil {
		return err
	}

	return nil
}
