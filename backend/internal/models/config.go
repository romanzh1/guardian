package models

type ServerConfig struct {
	Port string
}

type MongoConfig struct {
	MongoHost     string
	MongoDatabase string
	MongoUsername string
	MongoPassword string
}

type Config struct {
	Port          string `env:"PORT"`
	MongoHost     string `env:"MONGO_HOST"`
	MongoDatabase string `env:"MONGO_DATABASE"`
	MongoUsername string `env:"MONGO_USERNAME"`
	MongoPassword string `env:"MONGO_PASSWORD"`
}

func (c Config) GetServer() ServerConfig {
	return ServerConfig{
		Port: c.Port,
	}
}

func (c Config) GetMongo() MongoConfig {
	return MongoConfig{
		MongoHost:     c.MongoHost,
		MongoDatabase: c.MongoDatabase,
		MongoUsername: c.MongoUsername,
		MongoPassword: c.MongoPassword,
	}
}
