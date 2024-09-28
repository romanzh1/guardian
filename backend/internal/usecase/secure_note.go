package usecase

import (
	"context"

	"github.com/romanzh1/guardian/backend/internal/models"
)

type secureNoteRepository interface {
	Create(ctx context.Context, secureNote models.EntireSecureNote) (string, error)
	Read(ctx context.Context, id string) (models.EntireSecureNote, error)
	Update(ctx context.Context, secureNote models.EntireSecureNote) (models.EntireSecureNote, error)
	List(ctx context.Context) ([]models.SecureNote, error)
	Delete(ctx context.Context, id string) error
}

type SecureNote struct {
	repo secureNoteRepository
}

func NewSecureNote(repo secureNoteRepository) SecureNote {
	return SecureNote{repo: repo}
}

func (u SecureNote) Create(ctx context.Context, secureNote models.EntireSecureNote) (string, error) {
	return u.repo.Create(ctx, secureNote)
}

func (u SecureNote) Read(ctx context.Context, id string) (models.EntireSecureNote, error) {
	return u.repo.Read(ctx, id)
}

func (u SecureNote) Update(ctx context.Context, secureNote models.EntireSecureNote) (models.EntireSecureNote, error) {
	return u.repo.Update(ctx, secureNote)
}

func (u SecureNote) List(ctx context.Context) ([]models.SecureNote, error) {
	return u.repo.List(ctx)
}

func (u SecureNote) Delete(ctx context.Context, id string) error {
	return u.repo.Delete(ctx, id)
}
