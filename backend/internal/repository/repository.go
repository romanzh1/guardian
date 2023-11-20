package repository

import (
	"context"
	"fmt"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (r DB) GetUser(ctx context.Context, id string) (models.User, error) {
	user := models.User{}

	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.User{}, fmt.Errorf("object rom hex: %w", err)
	}

	if err := r.db.Collection("users").FindOne(ctx, bson.M{"_id": oID}).Decode(&user); err != nil {
		return models.User{}, fmt.Errorf("get account: %w", err)
	}

	return user, nil
}

func (r DB) GetAccount(ctx context.Context, id string) (models.EntireAccount, error) {
	account := models.EntireAccount{}

	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.EntireAccount{}, fmt.Errorf("object rom hex: %w", err)
	}

	if err := r.db.Collection("accounts").FindOne(ctx, bson.M{"_id": oID}).Decode(&account); err != nil {
		return models.EntireAccount{}, fmt.Errorf("get account: %w", err)
	}

	return account, nil
}

func (r DB) GetAccounts(ctx context.Context) ([]models.Account, error) {
	opts := options.Find().SetSort(bson.M{"name": 1})

	cursor, err := r.db.Collection("accounts").Find(ctx, bson.M{}, opts)
	if err != nil {
		return []models.Account{}, fmt.Errorf("find accounts: %w", err)
	}

	accounts := make([]models.Account, 0)

	if err := cursor.All(ctx, &accounts); err != nil {
		return []models.Account{}, fmt.Errorf("get accounts: %w", err)
	}

	for i := range accounts {
		for j := range accounts[i].Websites {
			accounts[i].Websites[j] = accounts[i].Websites[j] + "favicon.ico"
		}
	}

	return accounts, nil
}
