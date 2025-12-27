package users

import (
	"context"
	"errors"
	"fmt"

	"blockcred-backend/internal/database"
)

type User struct {
	ID           int
	Email        string
	PasswordHash string
	Role         string
}

func FindByEmail(email string) (*User, error) {

	fmt.Println("DEBUG FindByEmail called with:", email)
	row := database.DB.QueryRow(
		context.Background(),
		"SELECT id, email, password_hash, role FROM users where email=$1",
		email,
	)

	u := &User{}
	err := row.Scan(&u.ID, &u.Email, &u.PasswordHash, &u.Role)
	if err != nil {
		fmt.Println("DEBUG user NOT FOUND in DB")
		return nil, errors.New("user not found")
	}
	fmt.Println("DEBUG user FOUND:", u.Email, u.Role)
	fmt.Println("DEBUG stored hash:", u.PasswordHash)

	return u, nil
}

func CreateIssuer(email, passwordHash string) error {
	_, err := database.DB.Exec(
		context.Background(),
		"INSERT INTO users (email, password_hash, role) VALUES ($1, $2, 'ISSUER')",
		email,
		passwordHash,
	)

	return err
}
