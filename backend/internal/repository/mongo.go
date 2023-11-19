package repository

import (
	"context"
	"fmt"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DB struct {
	db *mongo.Database
}

func NewMongoDB(ctx context.Context, cfg models.MongoConfig) (DB, error) {
	DSN := fmt.Sprintf("mongodb+srv://%s:%s@%s/?retryWrites=true&w=majority",
		cfg.MongoUsername, cfg.MongoPassword, cfg.MongoHost)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(DSN))
	if err != nil {
		return DB{}, fmt.Errorf("mongo connect %w", err)
	}

	return DB{db: client.Database(cfg.MongoDatabase)}, nil
}
