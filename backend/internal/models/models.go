package models

type Website string

type User struct {
	ID       string `bson:"_id" json:"id"`
	Username string `bson:"user_name" json:"user_name"`
	Email    string `bson:"email" json:"email"`
	Password string `bson:"password" json:"password"`
}

type Account struct {
	ID       string    `bson:"_id" json:"id"`
	Name     string    `bson:"name" json:"name"`
	Email    string    `bson:"email" json:"email"`
	Username string    `bson:"user_name" json:"user_name"`
	Websites []Website `bson:"websites" json:"-"`
	IconLink string    `json:"icon_link"`
}

type CustomField struct {
	Name  string `bson:"name"`
	Value string `bson:"value"`
}

type EntireAccount struct {
	ID           string        `bson:"_id" json:"id"`
	Name         string        `bson:"name" json:"name"`
	Email        string        `bson:"email" json:"email"`
	Username     string        `bson:"user_name" json:"user_name"`
	Password     string        `bson:"password" json:"password"`
	IsFavourite  bool          `bson:"is_favourite" json:"is_favourite"`
	Websites     []Website     `bson:"websites" json:"websites"`
	CustomFields []CustomField `bson:"custom_fields" json:"custom_fields"`
}

type Section struct {
	ID   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}

type SecureNote struct {
	ID   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}

type EntireSecureNote struct {
	ID   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
	Text string `bson:"text" json:"text"`
}
