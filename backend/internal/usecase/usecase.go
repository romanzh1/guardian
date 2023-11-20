package usecase

import (
	"context"

	"github.com/romanzh1/guardian/backend/internal/models"
)

type repositoryPassManager interface {
	GetUser(ctx context.Context, id string) (models.User, error)
	GetAccount(ctx context.Context, id string) (models.EntireAccount, error)
	GetAccounts(ctx context.Context) ([]models.Account, error)
}

type useCase struct {
	repo repositoryPassManager
}

func NewUseCase(repo repositoryPassManager) useCase {
	return useCase{repo: repo}
}

func (u useCase) GetUser(ctx context.Context, id string) (models.User, error) {
	return u.repo.GetUser(ctx, id)
}

func (u useCase) GetAccounts(ctx context.Context) ([]models.Account, error) {
	return u.repo.GetAccounts(ctx)
}

func (u useCase) GetAccount(ctx context.Context, id string) (models.EntireAccount, error) {
	return u.repo.GetAccount(ctx, id)
}
