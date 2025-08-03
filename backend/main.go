package main

import (
	"esports-stats-backend/handlers"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode
	if os.Getenv("GIN_MODE") == "" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Create Gin router
	r := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:8081", "http://localhost:3000", "http://localhost:5173"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// API routes
	api := r.Group("/api")
	{
		// Stats endpoints
		api.GET("/stats", handlers.GetStats)
		api.GET("/recent-winners", handlers.GetRecentWinners)
		api.GET("/live-events", handlers.GetLiveEvents)

		// Events endpoints
		api.GET("/events", handlers.GetEvents)
		api.GET("/events/featured", handlers.GetFeaturedEvents)
		api.GET("/events/:id", handlers.GetEventByID)
		api.GET("/events/:id/matches", handlers.GetEventMatches)

		// Teams endpoints
		api.GET("/teams", handlers.GetTeams)
		api.GET("/teams/:id", handlers.GetTeamByID)

		// Players endpoints
		api.GET("/players", handlers.GetPlayers)
		api.GET("/players/:id", handlers.GetPlayerByID)
	}

	// Health check endpoint
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"message": "PUBG/BGMI Esports Stats API is running",
		})
	})

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Printf("Starting server on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}