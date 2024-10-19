package handlers

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
)

type secureNoteUseCase interface {
	Create(ctx context.Context, secureNote models.EntireSecureNote) (string, error)
	Read(ctx context.Context, id string) (models.EntireSecureNote, error)
	Update(ctx context.Context, secureNote models.EntireSecureNote) (models.EntireSecureNote, error)
	List(ctx context.Context) ([]models.SecureNote, error)
	Delete(ctx context.Context, id string) error
}

func (h Handlers) CreateSecureNote(w http.ResponseWriter, r *http.Request) {
	secureNote := models.EntireSecureNote{}

	if err := render.DecodeJSON(r.Body, &secureNote); err != nil {
		h.handleError(w, r, err)

		return
	}

	id, err := h.secureNote.Create(r.Context(), secureNote)
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, id)
}

func (h Handlers) GetSecureNote(w http.ResponseWriter, r *http.Request) {
	secureNote, err := h.secureNote.Read(r.Context(), chi.URLParam(r, "id"))
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, secureNote)
}

func (h Handlers) GetSecureNotes(w http.ResponseWriter, r *http.Request) {
	secureNotes, err := h.secureNote.List(r.Context())
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, secureNotes)
}

func (h Handlers) UpdateSecureNote(w http.ResponseWriter, r *http.Request) {
	secureNote := models.EntireSecureNote{}

	secureNote.ID = chi.URLParam(r, "id")

	if err := render.DecodeJSON(r.Body, &secureNote); err != nil {
		h.handleError(w, r, err)

		return
	}

	secureNote, err := h.secureNote.Update(r.Context(), secureNote)
	if err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, secureNote)
}

func (h Handlers) DeleteSecureNote(w http.ResponseWriter, r *http.Request) {
	if err := h.secureNote.Delete(r.Context(), chi.URLParam(r, "id")); err != nil {
		h.handleError(w, r, err)

		return
	}

	render.JSON(w, r, nil)
}
