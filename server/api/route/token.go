package route

import (
	"fmt"
	"server/api/controller"
	"server/bootstrap"
	"server/domain"
	"server/mongo"
	"server/repository"
	"server/usecase"
	"time"

	"github.com/gin-gonic/gin"
)

func NewTokenRouter(env *bootstrap.Env, t time.Duration, db mongo.Database, g *gin.RouterGroup) {
	fmt.Println("route.signup.go/NewTokenRouter")

	ur := repository.NewUserRepository(db, domain.CollectionUser)

	tc := &controller.TokenController{
		TokenUsecase: usecase.NewRefreshTokenUsecase(ur, t),
		Env:          env,
	}

	g.POST("/refresh-token", tc.RefreshToken)
}
