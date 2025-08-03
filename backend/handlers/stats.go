package handlers

import (
	"esports-stats-backend/data"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetStats returns overall platform statistics
func GetStats(c *gin.Context) {
	stats := data.GetStats()
	c.JSON(http.StatusOK, gin.H{
		"stats": stats,
	})
}

// GetRecentWinners returns recent tournament winners
func GetRecentWinners(c *gin.Context) {
	var recentWinners []map[string]interface{}
	
	for _, event := range data.Events {
		if event.Status == "completed" && event.Winner != nil {
			recentWinners = append(recentWinners, map[string]interface{}{
				"eventId":    event.ID,
				"eventName":  event.Name,
				"winner":     *event.Winner,
				"prizePool":  event.PrizePool,
				"game":       event.Game,
				"endDate":    event.EndDate,
			})
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"winners": recentWinners,
	})
}

// GetLiveEvents returns currently ongoing events
func GetLiveEvents(c *gin.Context) {
	var liveEvents []map[string]interface{}
	
	for _, event := range data.Events {
		if event.Status == "ongoing" {
			liveEvents = append(liveEvents, map[string]interface{}{
				"id":        event.ID,
				"name":      event.Name,
				"game":      event.Game,
				"location":  event.Location,
				"teams":     event.Teams,
				"startDate": event.StartDate,
				"endDate":   event.EndDate,
			})
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"liveEvents": liveEvents,
	})
}