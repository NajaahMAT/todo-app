package controller

import (
	"fmt"
	"math/rand"
	"net/http"
	"server/domain"

	"github.com/gin-gonic/gin"
)

type ImageUploadController struct{}

var letters = []rune("abcdefghijklmnopqrstuvwxy")

func randLetter(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func (l *ImageUploadController) Upload(c *gin.Context) {
	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: err.Error()})
		return
	}

	fmt.Println(form)

	files := form.File["image"]
	fileName := ""

	for _, file := range files {
		fileName = randLetter(5) + "-" + file.Filename
		if err := c.SaveUploadedFile(file, "./uploads/"+fileName); err != nil {
			c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: err.Error()})
			return
		}
	}

	response := domain.ImageUploadResponse{
		URL: "http://localhost:3001/api/uploads/" + fileName,
	}

	c.JSON(http.StatusOK, response)
}
