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
	{
		ID:          "13",
		Name:        "Snax",
		RealName:    "Raj Verma",
		TeamID:      "4",
		Nationality: "India",
		Game:        "PUBG",
		EventIDs:    []string{"1", "3", "7"},
		TotalKills:  1100,
		TotalDamage: 2100000,
		WinRate:     55.0,
		Avatar:      "/avatars/snax.png",
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
    {
		ID:      "2",
		EventID: "2",
		Number:  2,
		Map:     "Miramar",
		Mode:    "Squad",
		Date:    time.Date(2024, 7, 1, 15, 0, 0, 0, time.UTC),
		Rankings: []models.MatchTeamRanking{
			{
				TeamID:   "1",
				TeamName: "Team SouL",
				Rank:     3,
				Points:   8,
				Kills:    5,
				Players: []models.MatchPlayerStats{
					{
						PlayerID:     "1",
						PlayerName:   "MortaL",
						Kills:        2,
						Assists:      1,
						Damage:       450,
						SurvivalTime: 1500,
					},
				},
			},
		},
		MVP:       stringPtr("2"),
		ReplayURL: stringPtr("https://replay.example.com/match2"),
	},
    {
        ID:      "3",
        EventID: "3",
        Number:  1,
        Map:     "Sanhok",
        Mode:    "Squad",
        Date:    time.Date(2024, 8, 1, 16, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "2",
                TeamName: "Team Liquid",
                Rank:     1,
                Points:   18,
                Kills:    15,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "5",
                        PlayerName:   "ibiza",
                        Kills:        7,
                        Assists:      3,
                        Damage:       1200,
                        SurvivalTime: 1900,
                    },
                },
            },
        },
        MVP:       stringPtr("5"),
        ReplayURL: stringPtr("https://replay.example.com/match3"),
    },
    {
        ID:      "4",
        EventID: "5",
        Number:  1,
        Map:     "Erangel",
        Mode:    "Squad",
        Date:    time.Date(2024, 6, 15, 12, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "2",
                TeamName: "Team Liquid",
                Rank:     1,
                Points:   20,
                Kills:    18,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "6",
                        PlayerName:   "sambty",
                        Kills:        9,
                        Assists:      4,
                        Damage:       1500,
                        SurvivalTime: 2000,
                    },
                },
            },
        },
        MVP:       stringPtr("6"),
        ReplayURL: stringPtr("https://replay.example.com/match4"),
    },
    {
        ID:      "5",
        EventID: "6",
        Number:  1,
        Map:     "Livik",
        Mode:    "Squad",
        Date:    time.Date(2024, 8, 20, 18, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "1",
                TeamName: "Team SouL",
                Rank:     2,
                Points:   10,
                Kills:    8,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "2",
                        PlayerName:   "ClutchGod",
                        Kills:        3,
                        Assists:      2,
                        Damage:       600,
                        SurvivalTime: 1000,
                    },
                },
            },
        },
        MVP:       stringPtr("2"),
        ReplayURL: stringPtr("https://replay.example.com/match5"),
    },
	{
        ID:      "6",
        EventID: "7",
        Number:  1,
        Map:     "Erangel",
        Mode:    "Squad",
        Date:    time.Date(2024, 10, 1, 14, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "4",
                TeamName: "FAZE Clan",
                Rank:     1,
                Points:   22,
                Kills:    14,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "13",
                        PlayerName:   "Snax",
                        Kills:        6,
                        Assists:      3,
                        Damage:       1100,
                        SurvivalTime: 1950,
                    },
                },
            },
        },
        MVP:       stringPtr("13"),
        ReplayURL: stringPtr("https://replay.example.com/match6"),
    },
	{
        ID:      "7",
        EventID: "7",
        Number:  2,
        Map:     "Miramar",
        Mode:    "Squad",
        Date:    time.Date(2024, 10, 2, 15, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "4",
                TeamName: "FAZE Clan",
                Rank:     2,
                Points:   12,
                Kills:    9,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "13",
                        PlayerName:   "Snax",
                        Kills:        4,
                        Assists:      2,
                        Damage:       800,
                        SurvivalTime: 1800,
                    },
                },
            },
        },
        MVP:       stringPtr("13"),
        ReplayURL: stringPtr("https://replay.example.com/match7"),
    },
	{
        ID:      "8",
        EventID: "8",
        Number:  1,
        Map:     "Erangel",
        Mode:    "Squad",
        Date:    time.Date(2024, 12, 1, 14, 0, 0, 0, time.UTC),
        Rankings: []models.MatchTeamRanking{
            {
                TeamID:   "3",
                TeamName: "TSM Entity",
                Rank:     1,
                Points:   19,
                Kills:    11,
                Players: []models.MatchPlayerStats{
                    {
                        PlayerID:     "9",
                        PlayerName:   "Neyoo",
                        Kills:        5,
                        Assists:      2,
                        Damage:       900,
                        SurvivalTime: 1750,
                    },
                },
            },
        },
        MVP:       stringPtr("9"),
        ReplayURL: stringPtr("https://replay.example.com/match8"),
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