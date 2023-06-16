package route

import (
	"server/api/controller"
	"server/bootstrap"
	"server/domain"
	"server/mongo"
	"server/repository"
	"server/usecase"
	"time"

	"github.com/gin-gonic/gin"
)

func NewUserRouter(env *bootstrap.Env, t time.Duration, db mongo.Database, g *gin.RouterGroup) {
	ur := repository.NewUserRepository(db, domain.CollectionUser)
	uc := &controller.UserController{
		LoginUsecase: usecase.NewLoginUsecase(ur, t),
		Env:          env,
	}

	g.GET("/user/email/:email", uc.GetUserProfile)
}
