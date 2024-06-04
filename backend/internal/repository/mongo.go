package repository

import (
	"context"
	"fmt"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.uber.org/zap"
)

type DB struct {
	db *mongo.Database
}

func NewMongoDB(ctx context.Context, cfg models.MongoConfig) (DB, error) {
	DSN := ""

	if cfg.Environment == models.EnvironmentLocal {
		DSN = fmt.Sprintf("mongodb://%s/%s", cfg.MongoHost, cfg.MongoDatabase)
	} else {
		DSN = fmt.Sprintf("mongodb+srv://%s:%s@%s/%s?retryWrites=true&w=majority",
			cfg.MongoUsername, cfg.MongoPassword, cfg.MongoHost, cfg.MongoDatabase)
	}

	zap.S().Infof("DSN: %s", DSN)

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(DSN))
	if err != nil {
		return DB{}, fmt.Errorf("mongo connect %w", err)
	}

	if err = client.Ping(ctx, nil); err != nil {
		return DB{}, fmt.Errorf("ping: %w", err)
	}

	return DB{db: client.Database(cfg.MongoDatabase)}, nil
}

func (r DB) Close() error {
	if err := r.db.Client().Disconnect(context.Background()); err != nil {
		return fmt.Errorf("disconnect: %w", err)
	}

	return nil
}
