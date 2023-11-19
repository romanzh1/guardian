package usecase

import (
	"context"

	"github.com/romanzh1/guardian/backend/internal/models"
)

type repositoryPassManager interface {
	GetAccount(ctx context.Context, id string) (models.EntireAccount, error)
	GetAccounts(ctx context.Context) ([]models.Account, error)
}

type useCase struct {
	repo repositoryPassManager
}

func NewUseCase(repo repositoryPassManager) useCase {
	return useCase{repo: repo}
}

func (u useCase) GetAccounts(ctx context.Context) ([]models.Account, error) {
	return u.repo.GetAccounts(ctx)
}

func (u useCase) GetAccount(ctx context.Context, id string) (models.EntireAccount, error) {
	return u.repo.GetAccount(ctx, id)
}
