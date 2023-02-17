package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func commandHandler(c *gin.Context) {
	var command map[string]string
	c.BindJSON(&command)
	signal := fmt.Sprintf("%s%c", command["signal"], DELIMITER)

	num, err := theDevice.write(signal)
	if err != nil {
		log.Printf("Sender: Write Error: %s\n", err)
		c.JSON(http.StatusOK, gin.H{
			"error": err.Error(),
		})
	}
	log.Printf("Sender: Wrote %d byte(s)\n", num)
	respContent, err := theDevice.read()
	if err != nil {
		log.Printf("Sender: Read error: %s", err)
		c.JSON(http.StatusOK, gin.H{
			"error": err.Error(),
		})
	}
	log.Printf("Sender: Received content: %s\n", respContent)

	c.JSON(http.StatusOK, gin.H{
		"status": respContent,
	})
}
