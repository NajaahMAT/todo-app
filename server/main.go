package main

import (
	"fmt"
	"server/api/route"
	"server/bootstrap"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("Welcome to todo application..")

	app := bootstrap.App()
	env := app.Env

	db := app.Mongo.Database(env.DBName)
	defer app.CloseDBConnection()

	timeout := time.Duration(env.ContextTimeout) * time.Second

	gin := gin.Default()

	route.Setup(env, timeout, db, gin)

	gin.Run(env.ServerAddress)

}
