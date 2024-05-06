package handlers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

func (h Handlers) InitializeHandlers() http.Handler {
	h.router.Route("/api", func(r chi.Router) {
		r.Get("/", h.Main)

		r.Get("/accounts", h.GetAccounts)
		r.Get("/accounts/{id}", h.GetAccount)

		r.Get("/user/{id}", h.GetUser)

		r.Get("/secure_notes", h.GetSecureNotes)
		r.Get("/secure_notes/{id}", h.GetSecureNote)
	})

	return h.router
}

func (h Handlers) Main(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, "Welcome to the club")
}
