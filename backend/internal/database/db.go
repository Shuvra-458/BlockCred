package database

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func Connect() {
	connStr := "postgres://hackd-69@/blockcred?host=/var/run/postgresql&sslmode=disable"

	pool, err := pgxpool.New(context.Background(), connStr)
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	DB = pool
	var dbName, user, schema string
	err = DB.QueryRow(
		context.Background(),
		"SELECT current_database(), current_user, current_schema()",
	).Scan(&dbName, &user, &schema)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("DB connected to ->", dbName, "USER ->", user, "SCHEMA ->", schema)
}
