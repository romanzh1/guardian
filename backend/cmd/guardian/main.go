package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/caarlos0/env"
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

	cfg := models.Config{}
	if err := env.Parse(&cfg); err != nil {
		zap.S().Fatalf("env parse: %s", err)
	}

	ctx := context.Background()

	mongoDB, err := repository.NewMongoDB(ctx, cfg.GetMongo())

	useCase := usecase.NewUseCase(mongoDB)

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	//Необходимо создать и заполнить базу данных для менеджера паролей тестовыми, но реалистичными данными.
	//	Создай базу данных с 3 таблицами и заполни их
	//Таблица passwords: email, name, username, website
	//Таблица

	h := handlers.NewHandler(r, useCase)
	h.InitializeHandlers()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, syscall.SIGTERM)

	h.StartServe(ctx, cfg.GetServer(), quit)
}

func initLogger() (*zap.Logger, error) {
	config := zap.NewDevelopmentConfig()
	config.EncoderConfig.EncodeLevel = zapcore.CapitalColorLevelEncoder
	logger, err := config.Build()
	if err != nil {
		return nil, err
	}

	zap.ReplaceGlobals(logger)

	return logger, nil
}
