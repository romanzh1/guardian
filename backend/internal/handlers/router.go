package handlers

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
	"go.uber.org/zap"
)

type Handlers struct {
	router     *chi.Mux
	account    accountUseCase
	secureNote secureNoteUseCase
	user       userUseCase
}

func NewHandlers(r *chi.Mux, uc accountUseCase, sn secureNoteUseCase, us userUseCase) Handlers {
	return Handlers{router: r, account: uc, secureNote: sn, user: us}
}

func (h Handlers) AllowCORS() http.Handler {
	corsMiddleware := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	h.router.Use(corsMiddleware.Handler)

	return h.router
}

func (h Handlers) StartServe(ctx context.Context, cfg models.ServerConfig, quit chan os.Signal) {
	ctxShutdown, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	server := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        h.router,
		ReadTimeout:    20 * time.Second,
		WriteTimeout:   20 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		if err := server.ListenAndServe(); err != nil {
			zap.S().Fatalf("serve: %s", err)
		}
	}()

	zap.S().Infof("Application start on %s port", cfg.Port)

	<-quit
	close(quit)

	zap.S().Info("Server shutting down...")

	// TODO server sometimes can not be shutdown
	if err := server.Shutdown(ctxShutdown); err != nil {
		zap.S().Errorf("Server forced to shutdown: %s", err)
	}

	zap.S().Info("Server exiting")
}

func (h Handlers) handleError(w http.ResponseWriter, r *http.Request, err error) {
	type errorResponse struct {
		Error      string `json:"error"`
		StatusCode int    `json:"-"`
	}

	response := errorResponse{
		Error:      err.Error(),
		StatusCode: http.StatusUnauthorized,
	}

	zap.S().Errorw("Internal error\n",
		"error", err.Error(),
		"status_code", http.StatusUnauthorized,
		"path", r.URL.Path,
		"method", r.Method,
	)

	render.Status(r, response.StatusCode)
	render.JSON(w, r, response)
}
