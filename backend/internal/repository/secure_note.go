package repository

import (
	"context"
	"fmt"

	"github.com/romanzh1/guardian/backend/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type SecureNote struct {
	db DB
}

func NewSecureNote(db DB) SecureNote {
	return SecureNote{db: db}
}

func (r SecureNote) Create(ctx context.Context, secureNote models.EntireSecureNote) (string, error) {
	result, err := r.db.db.Collection("secure_notes").InsertOne(ctx, secureNote)
	if err != nil {
		return "", fmt.Errorf("create secure note: %w", err)
	}

	oID := result.InsertedID.(primitive.ObjectID)

	return oID.Hex(), nil
}

func (r SecureNote) Update(ctx context.Context, secureNote models.EntireSecureNote) (models.EntireSecureNote, error) {
	oID, err := primitive.ObjectIDFromHex(secureNote.ID)
	if err != nil {
		return models.EntireSecureNote{}, fmt.Errorf("object rom hex: %w", err)
	}

	if _, err := r.db.db.Collection("secure_notes").UpdateByID(ctx, oID, secureNote); err != nil {
		return models.EntireSecureNote{}, fmt.Errorf("update secure note: %w", err)
	}

	return secureNote, nil
}

func (r SecureNote) Read(ctx context.Context, id string) (models.EntireSecureNote, error) {
	secureNote := models.EntireSecureNote{}

	oID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.EntireSecureNote{}, fmt.Errorf("object rom hex: %w", err)
	}

	if err := r.db.db.Collection("secure_notes").FindOne(ctx, bson.M{"_id": oID}).Decode(&secureNote); err != nil {
		return models.EntireSecureNote{}, fmt.Errorf("get secure note: %w", err)
	}

	return secureNote, nil
}

func (r SecureNote) List(ctx context.Context) ([]models.SecureNote, error) {
	opts := options.Find().SetSort(bson.M{"name": 1})

	cursor, err := r.db.db.Collection("secure_notes").Find(ctx, bson.M{}, opts)
	if err != nil {
		return []models.SecureNote{}, fmt.Errorf("find secure notes: %w", err)
	}

	secureNotes := make([]models.SecureNote, 0)

	if err := cursor.All(ctx, &secureNotes); err != nil {
		return []models.SecureNote{}, fmt.Errorf("get secure notes: %w", err)
	}

	return secureNotes, nil
}
