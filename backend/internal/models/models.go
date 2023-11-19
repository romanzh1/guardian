package models

type Website string

type Account struct {
	ID       string    `bson:"_id" json:"id"`
	Name     string    `bson:"name" json:"name"`
	Email    string    `bson:"email" json:"email"`
	Username string    `bson:"username" json:"username"`
	Websites []Website `bson:"websites" json:"websites"`
}

type EntireAccount struct {
	ID       string    `bson:"_id" json:"id"`
	Name     string    `bson:"name" json:"name"`
	Email    string    `bson:"email" json:"email"`
	Username string    `bson:"username" json:"username"`
	Password string    `bson:"password" json:"password"`
	Websites []Website `bson:"websites" json:"websites"`
}
