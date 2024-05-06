package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
)

type secureNoteUseCase interface {
	Read(ctx context.Context, id string) (models.EntireSecureNote, error)
	Update(ctx context.Context, secureNote models.EntireSecureNote) (models.EntireSecureNote, error)
	List(ctx context.Context) ([]models.SecureNote, error)
}

func (h Handlers) GetSecureNote(w http.ResponseWriter, r *http.Request) {
	secureNote, err := h.account.Read(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, secureNote)
}

func (h Handlers) GetSecureNotes(w http.ResponseWriter, r *http.Request) {
	secureNotes, err := h.account.List(r.Context())
	if err != nil {
		h.handleError(w, r, err)
		return
	}

	render.JSON(w, r, secureNotes)
}
