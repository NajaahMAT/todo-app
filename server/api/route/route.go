package route

import (
	"fmt"
	"time"

	"server/api/middleware"
	"server/bootstrap"
	"server/mongo"

	"github.com/gin-gonic/gin"
)

func Setup(env *bootstrap.Env, timeout time.Duration, db mongo.Database, gin *gin.Engine) {
	publicRouter := gin.Group("")
	publicRouter.Use(CORS())

	protectedRouter := gin.Group("")
	protectedRouter.Use(middleware.JwtAuthMiddleware(env.AccessTokenSecret))
	protectedRouter.Use(CORS())

	// All Public APIs
	NewSignupRouter(env, timeout, db, publicRouter)
	NewLoginRouter(env, timeout, db, publicRouter)
	NewTokenRouter(env, timeout, db, publicRouter)

	// All Private APIs
	// CreateTaskRouter(env, timeout, db, protectedRouter)
	// GetTasksRouter(env, timeout, db, protectedRouter)
	NewTaskRouter(env, timeout, db, publicRouter)
	NewUserRouter(env, timeout, db, publicRouter)
	NewSignoutRouter(publicRouter)
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {

		// c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, Origin, Cache-Control, X-Requested-With, Authentication")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "PUT, DELETE")
		// c.Writer.Header().Set("Mode", "PUT, DELETE")
		fmt.Println(c.Request.Header)

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
