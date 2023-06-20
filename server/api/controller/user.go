package controller

import (
	"fmt"
	"net/http"
	"server/bootstrap"
	"server/domain"

	"github.com/gin-gonic/gin"
)

type UserController struct {
	LoginUsecase domain.LoginUsecase
	Env          *bootstrap.Env
}

func (u *UserController) GetUserProfile(c *gin.Context) {
	email := c.Param("email")

	fmt.Println("email: ", email)

	user, err := u.LoginUsecase.GetUserByEmail(c, email)
	if err != nil {
		c.JSON(http.StatusNotFound, domain.ErrorResponse{Message: "User not found with the given email"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (u *UserController) GetUserProfileByID(c *gin.Context) {
	id := c.Param("id")

	fmt.Println("user_id: ", id)

	user, err := u.LoginUsecase.GetUserByID(c, id)
	if err != nil {
		c.JSON(http.StatusNotFound, domain.ErrorResponse{Message: "User not found with the given email"})
		return
	}

	c.JSON(http.StatusOK, user)
}
