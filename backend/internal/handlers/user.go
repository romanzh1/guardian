package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
)

type userUseCase interface {
	Create(ctx context.Context, user models.User) (string, error)
	Read(ctx context.Context, id string) (models.User, error)
	Update(ctx context.Context, user models.User) (models.User, error)
	Delete(ctx context.Context, id string) error
	List(ctx context.Context) ([]models.User, error)
}

func (h Handlers) CreateUser(w http.ResponseWriter, r *http.Request) {
	user := models.User{}

	if err := render.DecodeJSON(r.Body, &user); err != nil {
		h.handleError(w, r, err)

		return
	}

	id, err := h.user.Create(r.Context(), user)
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, id)
}

func (h Handlers) GetUser(w http.ResponseWriter, r *http.Request) {
	user, err := h.user.Read(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, user)
}

func (h Handlers) GetUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.user.List(r.Context())
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, users)
}

func (h Handlers) UpdateUser(w http.ResponseWriter, r *http.Request) {
	user := models.User{}

	if err := render.DecodeJSON(r.Body, &user); err != nil {
		h.handleError(w, r, err)

		return
	}

	user, err := h.user.Update(r.Context(), user)
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, user)
}
