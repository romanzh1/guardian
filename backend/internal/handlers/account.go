package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
)

type accountUseCase interface {
	Create(ctx context.Context, account models.EntireAccount) (string, error)
	Read(ctx context.Context, id string) (models.EntireAccount, error)
	Update(ctx context.Context, account models.EntireAccount) (models.EntireAccount, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]models.Account, error)
}

func (h Handlers) CreateAccount(w http.ResponseWriter, r *http.Request) {
	account := models.EntireAccount{}

	if err := render.DecodeJSON(r.Body, &account); err != nil {
		h.handleError(w, r, err)
		return
	}

	id, err := h.account.Create(r.Context(), account)
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, id)
}

func (h Handlers) GetAccount(w http.ResponseWriter, r *http.Request) {
	account, err := h.account.Read(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, account)
}

func (h Handlers) GetAccounts(w http.ResponseWriter, r *http.Request) {
	accounts, err := h.account.List(r.Context())
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, accounts)
}

func (h Handlers) UpdateAccount(w http.ResponseWriter, r *http.Request) {
	account := models.EntireAccount{}

	account.ID = chi.URLParam(r, "id")

	if err := render.DecodeJSON(r.Body, &account); err != nil {
		h.handleError(w, r, err)
		return
	}

	account, err := h.account.Update(r.Context(), account)
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, account)
}

func (h Handlers) DeleteAccount(w http.ResponseWriter, r *http.Request) {
	err := h.account.Delete(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.NoContent(w, r)
}
