package data

import (
	"esports-stats-backend/models"
	"time"
)

var Events = []models.Event{
	{
		ID:        "1",
		Name:      "PUBG Mobile World Championship 2024",
		Organizer: "Krafton",
		StartDate: time.Date(2024, 8, 15, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 8, 25, 0, 0, 0, 0, time.UTC),
		Location:  "Seoul, South Korea",
		PrizePool: "$3,000,000",
		Game:      "PUBG",
		Status:    "upcoming",
		Teams:     32,
		Featured:  true,
	},
	{
		ID:        "2",
		Name:      "BGMI Pro League Season 3",
		Organizer: "Krafton India",
		StartDate: time.Date(2024, 7, 1, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 7, 20, 0, 0, 0, 0, time.UTC),
		Location:  "Mumbai, India",
		PrizePool: "₹1,50,00,000",
		Game:      "BGMI",
		Status:    "completed",
		Teams:     18,
		Winner:    stringPtr("Team SouL"),
		Featured:  true,
	},
	{
		ID:        "3",
		Name:      "PUBG Continental Series",
		Organizer: "Krafton",
		StartDate: time.Date(2024, 8, 1, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 8, 10, 0, 0, 0, 0, time.UTC),
		Location:  "Online",
		PrizePool: "$2,000,000",
		Game:      "PUBG",
		Status:    "ongoing",
		Teams:     24,
		Featured:  true,
	},
	{
		ID:        "4",
		Name:      "BGMI Masters Cup 2024",
		Organizer: "Krafton India",
		StartDate: time.Date(2024, 9, 1, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 9, 15, 0, 0, 0, 0, time.UTC),
		Location:  "Delhi, India",
		PrizePool: "₹2,00,00,000",
		Game:      "BGMI",
		Status:    "upcoming",
		Teams:     20,
		Featured:  false,
	},
	{
		ID:        "5",
		Name:      "PUBG Nations Cup 2024",
		Organizer: "Krafton",
		StartDate: time.Date(2024, 6, 15, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 6, 30, 0, 0, 0, 0, time.UTC),
		Location:  "Bangkok, Thailand",
		PrizePool: "$1,500,000",
		Game:      "PUBG",
		Status:    "completed",
		Teams:     16,
		Winner:    stringPtr("Team Liquid"),
		Featured:  false,
	},
	{
		ID:        "6",
		Name:      "BGMI Open Challenge",
		Organizer: "Krafton India",
		StartDate: time.Date(2024, 8, 20, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 8, 25, 0, 0, 0, 0, time.UTC),
		Location:  "Online",
		PrizePool: "₹50,00,000",
		Game:      "BGMI",
		Status:    "ongoing",
		Teams:     50,
		Featured:  false,
	},
	{
		ID:        "7",
		Name:      "PUBG Global Invitational",
		Organizer: "Krafton",
		StartDate: time.Date(2024, 10, 1, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 10, 15, 0, 0, 0, 0, time.UTC),
		Location:  "Los Angeles, USA",
		PrizePool: "$4,000,000",
		Game:      "PUBG",
		Status:    "upcoming",
		Teams:     28,
		Featured:  false,
	},
	{
		ID:        "8",
		Name:      "BGMI Winter Championship",
		Organizer: "Krafton India",
		StartDate: time.Date(2024, 12, 1, 0, 0, 0, 0, time.UTC),
		EndDate:   time.Date(2024, 12, 20, 0, 0, 0, 0, time.UTC),
		Location:  "Bangalore, India",
		PrizePool: "₹3,00,00,000",
		Game:      "BGMI",
		Status:    "upcoming",
		Teams:     24,
		Featured:  false,
	},
}

var Teams = []models.Team{
	{
		ID:       "1",
		Name:     "Team SouL",
		Logo:     "/logos/soul.png",
		Region:   "India",
		Game:     "BGMI",
		Players:  []string{"1", "2", "3", "4"},
		EventIDs: []string{"2", "4", "6"},
		Wins:     15,
		Founded:  "2020",
	},
	{
		ID:       "2",
		Name:     "Team Liquid",
		Logo:     "/logos/liquid.png",
		Region:   "Europe",
		Game:     "PUBG",
		Players:  []string{"5", "6", "7", "8"},
		EventIDs: []string{"1", "3", "5"},
		Wins:     23,
		Founded:  "2018",
	},
	{
		ID:       "3",
		Name:     "TSM Entity",
		Logo:     "/logos/tsm.png",
		Region:   "India",
		Game:     "BGMI",
		Players:  []string{"9", "10", "11", "12"},
		EventIDs: []string{"2", "4", "6"},
		Wins:     12,
		Founded:  "2019",
	},
	{
		ID:       "4",
		Name:     "FAZE Clan",
		Logo:     "/logos/faze.png",
		Region:   "North America",
		Game:     "PUBG",
		Players:  []string{"13", "14", "15", "16"},
		EventIDs: []string{"1", "3", "7"},
		Wins:     18,
		Founded:  "2017",
	},
}

var Players = []models.Player{
	{
		ID:          "1",
		Name:        "MortaL",
		RealName:    "Naman Mathur",
		TeamID:      "1",
		Nationality: "India",
		Game:        "BGMI",
		EventIDs:    []string{"2", "4", "6"},
		TotalKills:  1250,
		TotalDamage: 2500000,
		WinRate:     65.5,
		Avatar:      "/avatars/mortal.png",
	},
	{
		ID:          "2",
		Name:        "ClutchGod",
		RealName:    "Vivek Aabhas",
		TeamID:      "1",
		Nationality: "India",
		Game:        "BGMI",
		EventIDs:    []string{"2", "4", "6"},
		TotalKills:  980,
		TotalDamage: 1950000,
		WinRate:     62.3,
		Avatar:      "/avatars/clutchgod.png",
	},
	{
		ID:          "5",
		Name:        "ibiza",
		RealName:    "Jeemzz",
		TeamID:      "2",
		Nationality: "Sweden",
		Game:        "PUBG",
		EventIDs:    []string{"1", "3", "5"},
		TotalKills:  1450,
		TotalDamage: 3200000,
		WinRate:     72.1,
		Avatar:      "/avatars/ibiza.png",
	},
	{
		ID:          "6",
		Name:        "sambty",
		RealName:    "Sambty",
		TeamID:      "2",
		Nationality: "Sweden",
		Game:        "PUBG",
		EventIDs:    []string{"1", "3", "5"},
		TotalKills:  1320,
		TotalDamage: 2950000,
		WinRate:     69.8,
		Avatar:      "/avatars/sambty.png",
	},
}

var Matches = []models.Match{
	{
		ID:      "1",
		EventID: "2",
		Number:  1,
		Map:     "Erangel",
		Mode:    "Squad",
		Date:    time.Date(2024, 7, 1, 14, 0, 0, 0, time.UTC),
		Rankings: []models.MatchTeamRanking{
			{
				TeamID:   "1",
				TeamName: "Team SouL",
				Rank:     1,
				Points:   15,
				Kills:    12,
				Players: []models.MatchPlayerStats{
					{
						PlayerID:     "1",
						PlayerName:   "MortaL",
						Kills:        4,
						Assists:      2,
						Damage:       850,
						SurvivalTime: 1800,
					},
				},
			},
		},
		MVP:       stringPtr("1"),
		ReplayURL: stringPtr("https://replay.example.com/match1"),
	},
}

// Helper function to create string pointers
func stringPtr(s string) *string {
	return &s
}

// GetStats calculates and returns platform statistics
func GetStats() models.Stats {
	totalEvents := len(Events)
	totalTeams := len(Teams)
	totalPlayers := len(Players)
	
	ongoing := 0
	completed := 0
	upcoming := 0
	
	for _, event := range Events {
		switch event.Status {
		case "ongoing":
			ongoing++
		case "completed":
			completed++
		case "upcoming":
			upcoming++
		}
	}
	
	return models.Stats{
		TotalTournaments: totalEvents,
		TotalTeams:       totalTeams,
		TotalPlayers:     totalPlayers,
		OngoingEvents:    ongoing,
		CompletedEvents:  completed,
		UpcomingEvents:   upcoming,
	}
}