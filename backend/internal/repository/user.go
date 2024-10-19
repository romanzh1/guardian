package repository

import (
	"context"
	"fmt"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type User struct {
	db DB
}

func NewUser(db DB) User {
	return User{db: db}
}

func (r User) Create(ctx context.Context, user models.User) (string, error) {
	result, err := r.db.db.Collection("users").InsertOne(ctx, user)
	if err != nil {
		return "", fmt.Errorf("create user: %w", err)
	}

	oID := result.InsertedID.(primitive.ObjectID)

	return oID.Hex(), nil
}

func (r User) Read(ctx context.Context, id string) (models.User, error) {
	user := models.User{}

	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.User{}, fmt.Errorf("object rom hex: %w", err)
	}

	if err := r.db.db.Collection("users").FindOne(ctx, bson.M{"_id": oID}).Decode(&user); err != nil {
		return models.User{}, fmt.Errorf("get account: %w", err)
	}

	return user, nil
}

func (r User) Update(ctx context.Context, user models.User) (models.User, error) {
	oID, err := primitive.ObjectIDFromHex(user.ID)
	if err != nil {
		return models.User{}, fmt.Errorf("object rom hex: %w", err)
	}

	if _, err := r.db.db.Collection("users").UpdateByID(ctx, oID, user); err != nil {
		return models.User{}, fmt.Errorf("get account: %w", err)
	}

	return user, nil
}

func (r User) Delete(ctx context.Context, id string) error {
	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("object rom hex: %w", err)
	}

	if _, err := r.db.db.Collection("users").DeleteOne(ctx, bson.M{"_id": oID}); err != nil {
		return fmt.Errorf("delete account: %w", err)
	}

	return nil
}

func (r User) List(ctx context.Context) ([]models.User, error) {
	users := make([]models.User, 0)

	opts := options.Find().SetSort(bson.M{"name": 1})

	cursor, err := r.db.db.Collection("users").Find(ctx, bson.M{}, opts) // TODO add filters
	if err != nil {
		return []models.User{}, fmt.Errorf("find users: %w", err)
	}

	if err := cursor.All(ctx, &users); err != nil {
		return []models.User{}, fmt.Errorf("get users: %w", err)
	}

	return users, nil
}
