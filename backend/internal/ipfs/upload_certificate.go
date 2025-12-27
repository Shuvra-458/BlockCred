package ipfs

func UploadCertificate(data any) (string, error) {
	return UploadJSONToIPFS(data)
}
