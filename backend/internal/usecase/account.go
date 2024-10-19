package usecase

import (
	"context"
	"fmt"
	"strings"

	"github.com/romanzh1/guardian/backend/internal/models"
)

type accountRepository interface {
	Create(ctx context.Context, account models.EntireAccount) (string, error)
	Read(ctx context.Context, id string) (models.EntireAccount, error)
	Update(ctx context.Context, account models.EntireAccount) (models.EntireAccount, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]models.Account, error)
}

type Account struct {
	repo accountRepository
}

func NewAccount(repo accountRepository) Account {
	return Account{
		repo: repo,
	}
}

func (u Account) Create(ctx context.Context, account models.EntireAccount) (string, error) {
	return u.repo.Create(ctx, account)
}

func (u Account) Read(ctx context.Context, id string) (models.EntireAccount, error) {
	return u.repo.Read(ctx, id)
}

func (u Account) Update(ctx context.Context, account models.EntireAccount) (models.EntireAccount, error) {
	return u.repo.Update(ctx, account)
}

func (u Account) Delete(ctx context.Context, id string) error {
	return u.repo.Delete(ctx, id)
}

func (u Account) List(ctx context.Context) ([]models.Account, error) {
	res, err := u.repo.List(ctx)
	if err != nil {
		return res, err
	}

	u.formIcons(res)

	return res, nil
}

func (u Account) formIcons(accounts []models.Account) {
	//re := regexp.MustCompile(`^((https?://)?(www\.)?)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-]+)`)
	icon := "favicon.ico"

	for i := range accounts {
		for _, website := range accounts[i].Websites {
			if strings.Contains(string(website), ".") {
				//result := re.FindStringSubmatch(string(website))
				//
				//if result[2] == "" {
				//	accounts[i].IconLink = fmt.Sprintf("https://www.%s/%s", result[4], icon)
				//} else {
				//	accounts[i].IconLink = fmt.Sprintf("%s/%s", result[0], icon)
				//}

				if strings.Contains(string(accounts[i].Websites[0]), "ico") {
					accounts[i].IconLink = string(accounts[i].Websites[0])

					continue
				}

				accounts[i].IconLink = fmt.Sprintf("%s%s", accounts[i].Websites[0], icon)
			}
		}
	}
}
