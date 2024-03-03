package main

import (
	"crypto/ecdsa"
	"fmt"
	"log"

	"github.com/ethereum/go-ethereum/accounts"
	"github.com/ethereum/go-ethereum/crypto"
)

func main() {
	// 生成一个新的以太坊私钥
	privateKey, err := crypto.GenerateKey()
	if err != nil {
		log.Fatal("生成私钥时出错:", err)
	}

	// 从私钥获取公钥
	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		log.Fatal("无法获取公钥")
	}

	// 从公钥获取以太坊地址
	address := crypto.PubkeyToAddress(*publicKeyECDSA).Hex()

	fmt.Println("生成的以太坊地址:", address)
	fmt.Println("对应的私钥:", crypto.HexToECDSA(crypto.FromECDSA(privateKey)).Hex())
}
