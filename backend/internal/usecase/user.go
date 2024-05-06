package usecase

import (
	"context"

	"github.com/romanzh1/guardian/backend/internal/models"
)

type userRepository interface {
	Create(ctx context.Context, user models.User) (string, error)
	Read(ctx context.Context, id string) (models.User, error)
	Update(ctx context.Context, user models.User) (models.User, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]models.User, error)
}

type User struct {
	repo userRepository
}

func NewUser(repo userRepository) User {
	return User{
		repo: repo,
	}
}

func (u User) Create(ctx context.Context, user models.User) (string, error) {
	return u.repo.Create(ctx, user)
}

func (u User) Read(ctx context.Context, id string) (models.User, error) {
	return u.repo.Read(ctx, id)
}

func (u User) Update(ctx context.Context, user models.User) (models.User, error) {
	return u.repo.Update(ctx, user)
}

func (u User) Delete(ctx context.Context, id string) error {
	return u.repo.Delete(ctx, id)
}

func (u User) List(ctx context.Context) ([]models.User, error) {
	res, err := u.repo.List(ctx)
	if err != nil {
		return res, err
	}

	return res, nil
}
