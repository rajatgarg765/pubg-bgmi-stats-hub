package models

import "time"

// Event represents a tournament event
type Event struct {
	ID         string    `json:"id"`
	Name       string    `json:"name"`
	Organizer  string    `json:"organizer"`
	StartDate  time.Time `json:"startDate"`
	EndDate    time.Time `json:"endDate"`
	Location   string    `json:"location"`
	PrizePool  string    `json:"prizePool"`
	Game       string    `json:"game"` // "PUBG" or "BGMI"
	Status     string    `json:"status"` // "upcoming", "ongoing", "completed"
	Teams      int       `json:"teams"`
	Winner     *string   `json:"winner,omitempty"`
	Featured   bool      `json:"featured"`
}

// Team represents a gaming team
type Team struct {
	ID       string   `json:"id"`
	Name     string   `json:"name"`
	Logo     string   `json:"logo"`
	Region   string   `json:"region"`
	Game     string   `json:"game"`
	Players  []string `json:"players"` // Player IDs
	EventIDs []string `json:"eventIds"`
	Wins     int      `json:"wins"`
	Founded  string   `json:"founded"`
}

// Player represents an individual player
type Player struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	RealName    string   `json:"realName"`
	TeamID      string   `json:"teamId"`
	Nationality string   `json:"nationality"`
	Game        string   `json:"game"`
	EventIDs    []string `json:"eventIds"`
	TotalKills  int      `json:"totalKills"`
	TotalDamage int64    `json:"totalDamage"`
	WinRate     float64  `json:"winRate"`
	Avatar      string   `json:"avatar"`
}

// Match represents a single match in a tournament
type Match struct {
	ID        string    `json:"id"`
	EventID   string    `json:"eventId"`
	Number    int       `json:"number"`
	Map       string    `json:"map"`
	Mode      string    `json:"mode"`
	Date      time.Time `json:"date"`
	Rankings  []MatchTeamRanking `json:"rankings"`
	MVP       *string   `json:"mvp,omitempty"`
	ReplayURL *string   `json:"replayUrl,omitempty"`
}

// MatchTeamRanking represents team performance in a match
type MatchTeamRanking struct {
	TeamID   string              `json:"teamId"`
	TeamName string              `json:"teamName"`
	Rank     int                 `json:"rank"`
	Points   int                 `json:"points"`
	Kills    int                 `json:"kills"`
	Players  []MatchPlayerStats  `json:"players"`
}

// MatchPlayerStats represents individual player stats in a match
type MatchPlayerStats struct {
	PlayerID     string  `json:"playerId"`
	PlayerName   string  `json:"playerName"`
	Kills        int     `json:"kills"`
	Assists      int     `json:"assists"`
	Damage       int     `json:"damage"`
	SurvivalTime int     `json:"survivalTime"` // in seconds
}

// Stats represents overall platform statistics
type Stats struct {
	TotalTournaments int `json:"totalTournaments"`
	TotalTeams       int `json:"totalTeams"`
	TotalPlayers     int `json:"totalPlayers"`
	OngoingEvents    int `json:"ongoingEvents"`
	CompletedEvents  int `json:"completedEvents"`
	UpcomingEvents   int `json:"upcomingEvents"`
}

// EventFilters represents filters for event queries
type EventFilters struct {
	Game   string `form:"game"`
	Status string `form:"status"`
	Search string `form:"search"`
	Limit  int    `form:"limit"`
	Offset int    `form:"offset"`
}