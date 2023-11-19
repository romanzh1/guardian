package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
)

type useCasePassManager interface {
	GetAccount(ctx context.Context, id string) (models.EntireAccount, error)
	GetAccounts(ctx context.Context) ([]models.Account, error)
}

func (h handler) InitializeHandlers() http.Handler {
	h.router.Get("/", h.Main)
	h.router.Get("/accounts", h.GetAccounts)
	h.router.Get("/accounts/{id}", h.GetAccount)

	return h.router
}

func (h handler) Main(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, "Welcome to the club")
}

func (h handler) GetAccount(w http.ResponseWriter, r *http.Request) {
	account, err := h.useCase.GetAccount(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, account)
}

func (h handler) GetAccounts(w http.ResponseWriter, r *http.Request) {
	accounts, err := h.useCase.GetAccounts(r.Context())
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, accounts)
}
