package blockchain

import (
	"context"
	"encoding/hex"
	"fmt"
	"math/big"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
)

type CertificateOnChain struct {
	IpfsCid  string
	Issuer   common.Address
	IssuedAt *big.Int
	Revoked  bool
}

func VerifyCertificate(certIdHex string) (*CertificateOnChain, error) {
	client := NewClient()
	parsedABI := LoadABI()

	contractAddr := common.HexToAddress(CONTRACT_ADDR)
	contract := bind.NewBoundContract(
		contractAddr,
		parsedABI,
		client,
		client,
		client,
	)

	decoded, err := hex.DecodeString(certIdHex)
	if err != nil || len(decoded) != 32 {
		return nil, fmt.Errorf("invalid certId")
	}

	var certID [32]byte
	copy(certID[:], decoded)

	var out []interface{}

	err = contract.Call(
		&bind.CallOpts{Context: context.Background()},
		&out,
		"verifyCertificate",
		certID,
	)
	if err != nil {
		return nil, err
	}

	ipfsCid, _ := out[0].(string)
	issuer, _ := out[1].(common.Address)
	issuedAt, _ := out[2].(*big.Int)
	revoked, _ := out[3].(bool)

	return &CertificateOnChain{
		IpfsCid:  ipfsCid,
		Issuer:   issuer,
		IssuedAt: issuedAt,
		Revoked:  revoked,
	}, nil
}
