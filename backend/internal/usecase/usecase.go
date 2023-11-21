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

type UseCase struct {
	repo repositoryPassManager
}

func NewUseCase(repo repositoryPassManager) UseCase {
	return UseCase{repo: repo}
}

func (u UseCase) GetUser(ctx context.Context, id string) (models.User, error) {
	return u.repo.GetUser(ctx, id)
}

func (u UseCase) GetAccounts(ctx context.Context) ([]models.Account, error) {
	return u.repo.GetAccounts(ctx)
}

func (u UseCase) GetAccount(ctx context.Context, id string) (models.EntireAccount, error) {
	return u.repo.GetAccount(ctx, id)
}
