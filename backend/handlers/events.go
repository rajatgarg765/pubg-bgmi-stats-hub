package handlers

import (
	"esports-stats-backend/data"
	"esports-stats-backend/models"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// GetEvents returns all events with optional filtering
func GetEvents(c *gin.Context) {
	var filters models.EventFilters
	if err := c.ShouldBindQuery(&filters); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	events := filterEvents(data.Events, filters)
	
	// Apply pagination
	if filters.Limit > 0 {
		start := filters.Offset
		end := start + filters.Limit
		if start > len(events) {
			events = []models.Event{}
		} else if end > len(events) {
			events = events[start:]
		} else {
			events = events[start:end]
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"events": events,
		"total":  len(data.Events),
	})
}

// GetFeaturedEvents returns only featured events
func GetFeaturedEvents(c *gin.Context) {
	var featuredEvents []models.Event
	for _, event := range data.Events {
		if event.Featured {
			featuredEvents = append(featuredEvents, event)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"events": featuredEvents,
	})
}

// GetEventByID returns a specific event by ID
func GetEventByID(c *gin.Context) {
	id := c.Param("id")
	
	for _, event := range data.Events {
		if event.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"event": event,
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Event not found"})
}

// GetEventMatches returns all matches for a specific event
func GetEventMatches(c *gin.Context) {
	eventID := c.Param("id")
	
	var matches []models.Match
	for _, match := range data.Matches {
		if match.EventID == eventID {
			matches = append(matches, match)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"matches": matches,
	})
}

// filterEvents applies filters to the events list
func filterEvents(events []models.Event, filters models.EventFilters) []models.Event {
	var filtered []models.Event

	for _, event := range events {
		// Filter by game
		if filters.Game != "" && filters.Game != "all" && 
		   strings.ToLower(event.Game) != strings.ToLower(filters.Game) {
			continue
		}

		// Filter by status
		if filters.Status != "" && filters.Status != "all" && 
		   event.Status != filters.Status {
			continue
		}

		// Filter by search term (name or organizer)
		if filters.Search != "" {
			searchTerm := strings.ToLower(filters.Search)
			if !strings.Contains(strings.ToLower(event.Name), searchTerm) &&
			   !strings.Contains(strings.ToLower(event.Organizer), searchTerm) {
				continue
			}
		}

		filtered = append(filtered, event)
	}

	return filtered
}

// GetTeams returns all teams with optional filtering
func GetTeams(c *gin.Context) {
	game := c.Query("game")
	region := c.Query("region")
	limit := c.Query("limit")

	teams := data.Teams
	var filtered []models.Team

	for _, team := range teams {
		// Filter by game
		if game != "" && game != "all" && 
		   strings.ToLower(team.Game) != strings.ToLower(game) {
			continue
		}

		// Filter by region
		if region != "" && region != "all" && 
		   strings.ToLower(team.Region) != strings.ToLower(region) {
			continue
		}

		filtered = append(filtered, team)
	}

	// Apply limit
	if limit != "" {
		if limitInt, err := strconv.Atoi(limit); err == nil && limitInt > 0 {
			if limitInt < len(filtered) {
				filtered = filtered[:limitInt]
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"teams": filtered,
		"total": len(data.Teams),
	})
}

// GetTeamByID returns a specific team by ID
func GetTeamByID(c *gin.Context) {
	id := c.Param("id")
	
	for _, team := range data.Teams {
		if team.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"team": team,
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Team not found"})
}

// GetPlayers returns all players with optional filtering
func GetPlayers(c *gin.Context) {
	game := c.Query("game")
	teamID := c.Query("teamId")
	limit := c.Query("limit")

	players := data.Players
	var filtered []models.Player

	for _, player := range players {
		// Filter by game
		if game != "" && game != "all" && 
		   strings.ToLower(player.Game) != strings.ToLower(game) {
			continue
		}

		// Filter by team
		if teamID != "" && player.TeamID != teamID {
			continue
		}

		filtered = append(filtered, player)
	}

	// Apply limit
	if limit != "" {
		if limitInt, err := strconv.Atoi(limit); err == nil && limitInt > 0 {
			if limitInt < len(filtered) {
				filtered = filtered[:limitInt]
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"players": filtered,
		"total":   len(data.Players),
	})
}

// GetPlayerByID returns a specific player by ID
func GetPlayerByID(c *gin.Context) {
	id := c.Param("id")
	
	for _, player := range data.Players {
		if player.ID == id {
			c.JSON(http.StatusOK, gin.H{
				"player": player,
			})
			return
		}
	}

	c.JSON(http.StatusNotFound, gin.H{"error": "Player not found"})
}