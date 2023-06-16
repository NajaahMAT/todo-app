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

func NewLoginRouter(env *bootstrap.Env, t time.Duration, db mongo.Database, g *gin.RouterGroup) {
	ur := repository.NewUserRepository(db, domain.CollectionUser)
	lc := &controller.LoginController{
		LoginUsecase: usecase.NewLoginUsecase(ur, t),
		Env:          env,
	}

	g.POST("/login", lc.Login)
}
