package handlers

import (
	"context"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/render"
	"github.com/romanzh1/guardian/backend/internal/models"
	"go.uber.org/zap"
)

type handler struct {
	router  *chi.Mux
	useCase useCasePassManager
}

func NewHandler(r *chi.Mux, uc useCasePassManager) handler {
	return handler{router: r, useCase: uc}
}

func (h handler) StartServe(ctx context.Context, cfg models.ServerConfig, quit chan os.Signal) {
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

	zap.S().Info("Server shutting down...")

	if err := server.Shutdown(ctx); err != nil {
		zap.S().Errorf("Server forced to shutdown: %s", err)
	}

	zap.S().Info("Server exiting")
}

func (h handler) handleError(w http.ResponseWriter, r *http.Request, err error) {
	type errorResponse struct {
		Error      string `json:"error"`
		StatusCode int    `json:"-"`
	}

	response := errorResponse{
		Error:      err.Error(),
		StatusCode: http.StatusUnauthorized,
	}

	zap.S().Errorf("handler error: %s", err)

	render.Status(r, response.StatusCode)
	render.JSON(w, r, response)
}
