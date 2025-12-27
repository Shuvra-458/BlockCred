package main

import (
	"blockcred-backend/internal/auth"
	"blockcred-backend/internal/certificates"
	"blockcred-backend/internal/database"

	"github.com/gin-gonic/gin"
)

func main() {
	database.Connect()

	r := gin.Default()

	r.POST("/auth/login", auth.Login)
	r.POST("/auth/register", auth.RequireRole("ADMIN"), auth.RegisterIssuer)

	r.POST("/certificates/issue", auth.RequireRole("ISSUER"), certificates.Issue)
	r.GET("/certificates/verify/:certId", certificates.Verify)

	r.Run(":8082")
}
