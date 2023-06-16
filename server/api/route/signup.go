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

func NewSignupRouter(env *bootstrap.Env, t time.Duration, db mongo.Database, g *gin.RouterGroup) {
	fmt.Println("route.signup.go/NewSignupRouter")

	ur := repository.NewUserRepository(db, domain.CollectionUser)

	sc := &controller.SignupController{
		SignupUsecase: usecase.NewSignupUsecase(ur, t),
		Env:           env,
	}

	g.POST("/signup", sc.Signup)
}
