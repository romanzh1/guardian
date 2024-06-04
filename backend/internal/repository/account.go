package repository

import (
	"context"
	"fmt"
	"time"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Account struct {
	db DB
}

func NewAccount(db DB) Account {
	return Account{db: db}
}

func (r Account) Create(ctx context.Context, account models.EntireAccount) (string, error) {
	result, err := r.db.db.Collection("accounts").InsertOne(ctx, account)
	if err != nil {
		return "", fmt.Errorf("create account: %w", err)
	}

	oID := result.InsertedID.(primitive.ObjectID)

	return oID.Hex(), nil
}

func (r Account) Read(ctx context.Context, id string) (models.EntireAccount, error) {
	account := models.EntireAccount{}

	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.EntireAccount{}, fmt.Errorf("object rom hex: %w", err)
	}

	if err := r.db.db.Collection("accounts").FindOne(ctx, bson.M{"_id": oID}).Decode(&account); err != nil {
		return models.EntireAccount{}, fmt.Errorf("get account %s: %w", oID.Hex(), err)
	}

	return account, nil
}

func (r Account) Update(ctx context.Context, account models.EntireAccount) (models.EntireAccount, error) {
	oID, err := primitive.ObjectIDFromHex(account.ID)
	if err != nil {
		return models.EntireAccount{}, fmt.Errorf("object rom hex: %w", err)
	}

	update := bson.M{
		"$set": bson.M{
			"name":          account.Name,
			"email":         account.Email,
			"user_name":     account.Username,
			"password":      account.Password,
			"is_favourite":  account.IsFavourite,
			"websites":      account.Websites,
			"custom_fields": account.CustomFields,
			"note":          account.Note,
			"updated_at":    time.Now(),
		},
	}

	if _, err := r.db.db.Collection("accounts").UpdateByID(ctx, oID, update); err != nil {
		return models.EntireAccount{}, fmt.Errorf("update account: %w", err)
	}

	return account, nil
}

func (r Account) Delete(ctx context.Context, id string) error {
	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("object from hex: %w", err)
	}

	if _, err := r.db.db.Collection("accounts").DeleteOne(ctx, oID); err != nil {
		return fmt.Errorf("delete account: %w", err)
	}

	return nil
}

func (r Account) List(ctx context.Context) ([]models.Account, error) {
	opts := options.Find().SetSort(bson.M{"name": 1})

	cursor, err := r.db.db.Collection("accounts").Find(ctx, bson.M{}, opts)
	if err != nil {
		return []models.Account{}, fmt.Errorf("find accounts: %w", err)
	}

	accounts := make([]models.Account, 0)

	if err := cursor.All(ctx, &accounts); err != nil {
		return []models.Account{}, fmt.Errorf("get accounts: %w", err)
	}

	return accounts, nil
}
