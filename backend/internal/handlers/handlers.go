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
		r.Post("/accounts", h.CreateAccount)
		r.Put("/accounts/{id}", h.UpdateAccount)
		r.Delete("/accounts/{id}", h.DeleteAccount)

		r.Get("/user/{id}", h.GetUser)

		r.Get("/secure-notes", h.GetSecureNotes)
		r.Get("/secure-notes/{id}", h.GetSecureNote)
		//r.Post("/secure-notes", h.CreateSecureNote)
		r.Put("/secure-notes/{id}", h.UpdateSecureNote)
	})

	return h.router
}

func (h Handlers) Main(w http.ResponseWriter, r *http.Request) {
	render.JSON(w, r, "Welcome to the club")
}
