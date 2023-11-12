package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/caarlos0/env"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/romanzh1/guardian/backend/internal/handlers"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Config struct {
	Port string `env:"PORT"`
}

func main() {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()
	if err != nil {
		log.Fatalf("Failed to initialize logger: %v", err)
		return
	}
	defer logger.Sync()

	zap.ReplaceGlobals(logger)

	cfg := Config{}
	if err := env.Parse(&cfg); err != nil {
		zap.S().Fatalf("env parse: %s", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	h := handlers.NewHandler(r)
	h.Main()

	server := &http.Server{
		Addr:           ":" + cfg.Port,
		Handler:        r,
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

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
	<-quit

	zap.S().Info("Server shutting down...")

	if err := server.Shutdown(ctx); err != nil {
		zap.S().Errorf("Server forced to shutdown: %s", err)
	}

	zap.S().Info("Server exiting")
}
