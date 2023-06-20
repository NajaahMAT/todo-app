package route

import (
	"fmt"
	"server/api/controller"

	"github.com/gin-gonic/gin"
)

func NewImageUploadRouter(g *gin.RouterGroup) {
	fmt.Println("route.image.go/NewImageUploadRouter")

	ic := &controller.ImageUploadController{}

	g.POST("/image/upload", ic.Upload)
}
