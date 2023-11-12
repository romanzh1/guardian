package handlers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
)

type Handler struct {
	router *chi.Mux
}

func NewHandler(r *chi.Mux) Handler {
	return Handler{router: r}
}

func (h Handler) Main() {
	h.router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		render.JSON(w, r, "Welcome to the club")
	})
}
