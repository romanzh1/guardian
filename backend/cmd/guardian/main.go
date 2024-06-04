package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/romanzh1/guardian/backend/internal/handlers"
	"github.com/romanzh1/guardian/backend/internal/models"
	"github.com/romanzh1/guardian/backend/internal/repository"
	"github.com/romanzh1/guardian/backend/internal/usecase"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	logger, err := initLogger()
	if err != nil {
		log.Fatalf("Failed to initialize logger: %v", err)
	}
	defer logger.Sync()

	cfg, err := models.NewConfig()
	if err != nil {
		zap.S().Fatalf("env parse: %s", err)
	}

	ctx := context.Background()

	mongoDB, err := repository.NewMongoDB(ctx, cfg.Mongo)

	accountRepo := repository.NewAccount(mongoDB)
	secureNoteRepo := repository.NewSecureNote(mongoDB)
	userRepo := repository.NewUser(mongoDB)

	accountUC := usecase.NewAccount(accountRepo)
	secureNoteUC := usecase.NewSecureNote(secureNoteRepo)
	userUC := usecase.NewUser(userRepo)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.StripSlashes)

	h := handlers.NewHandlers(r, accountUC, secureNoteUC, userUC)
	h.AllowCORS()
	h.InitializeHandlers()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	h.StartServe(ctx, cfg.ServerConfig, quit)
}

func initLogger() (*zap.Logger, error) {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	config.DisableStacktrace = true
	logger, err := config.Build(zap.AddCaller())
	if err != nil {
		return nil, err
	}

	zap.ReplaceGlobals(logger)

	return logger, nil
}
