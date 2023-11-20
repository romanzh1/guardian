package models

type Website string

type User struct {
	ID       string `bson:"_id" json:"id"`
	Username string `bson:"username" json:"user_name"`
	Email    string `bson:"email" json:"email"`
	Password string `bson:"password" json:"password"`
}

type Account struct {
	ID       string    `bson:"_id" json:"id"`
	Name     string    `bson:"name" json:"name"`
	Email    string    `bson:"email" json:"email"`
	Username string    `bson:"username" json:"user_name"`
	Websites []Website `bson:"websites" json:"websites"`
}

type EntireAccount struct {
	ID       string    `bson:"_id" json:"id"`
	Name     string    `bson:"name" json:"name"`
	Email    string    `bson:"email" json:"email"`
	Username string    `bson:"username" json:"user_name"`
	Password string    `bson:"password" json:"password"`
	Websites []Website `bson:"websites" json:"websites"`
}
