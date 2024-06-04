package models

import (
	"github.com/caarlos0/env/v11"
)

const (
	EnvironmentLocal       = "local"
	EnvironmentDevelopment = "development"
	EnvironmentProd        = "prod"
)

type ServerConfig struct {
	Port string `env:"PORT,required"`
}

type MongoConfig struct {
	MongoHost     string `env:"MONGO_HOST,required"`
	MongoDatabase string `env:"MONGO_DATABASE,required"`
	MongoUsername string `env:"MONGO_USERNAME"`
	MongoPassword string `env:"MONGO_PASSWORD"`
	Environment   string `env:"ENVIRONMENT" envDefault:"local"`
}

type Config struct {
	ServerConfig ServerConfig
	Mongo        MongoConfig
}

func NewConfig() (Config, error) {
	cfg := Config{}

	if err := env.Parse(&cfg); err != nil {
		return cfg, err
	}

	return cfg, nil
}
