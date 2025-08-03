# PUBG/BGMI Esports Stats Backend

A Go REST API backend for serving esports tournament data for PUBG and BGMI events.

## Features

- **Events API**: CRUD operations for tournament events
- **Teams API**: Team management and statistics  
- **Players API**: Player profiles and statistics
- **Stats API**: Platform-wide statistics and analytics
- **Filtering**: Advanced filtering for events, teams, and players
- **CORS Support**: Cross-origin requests enabled for frontend
- **Mock Data**: Comprehensive mock data for development

## API Endpoints

### Stats
- `GET /api/stats` - Get platform statistics
- `GET /api/recent-winners` - Get recent tournament winners
- `GET /api/live-events` - Get currently ongoing events

### Events
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/featured` - Get featured events
- `GET /api/events/:id` - Get specific event
- `GET /api/events/:id/matches` - Get matches for an event

### Teams
- `GET /api/teams` - Get all teams (with filtering)
- `GET /api/teams/:id` - Get specific team

### Players
- `GET /api/players` - Get all players (with filtering)
- `GET /api/players/:id` - Get specific player

## Query Parameters

### Events Filtering
- `game` - Filter by game (pubg/bgmi)
- `status` - Filter by status (upcoming/ongoing/completed)
- `search` - Search in event name or organizer
- `limit` - Limit number of results
- `offset` - Pagination offset

### Teams Filtering
- `game` - Filter by game
- `region` - Filter by region
- `limit` - Limit results

### Players Filtering
- `game` - Filter by game
- `teamId` - Filter by team
- `limit` - Limit results

## Running the Backend

### Prerequisites
- Go 1.21 or higher
- Git

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Initialize Go modules:
   ```bash
   go mod tidy
   ```

3. Run the server:
   ```bash
   go run main.go
   ```

4. The API will be available at `http://localhost:8000`

### Environment Variables

- `PORT` - Server port (default: 8000)
- `GIN_MODE` - Gin mode (release/debug)

### Health Check

The API provides a health check endpoint:
```bash
curl http://localhost:8000/health
```

## Project Structure

```
backend/
├── main.go              # Main server entry point
├── models/
│   └── models.go        # Data models and types
├── handlers/
│   ├── events.go        # Event-related handlers
│   └── stats.go         # Statistics handlers
├── data/
│   └── mock_data.go     # Mock data and helper functions
├── go.mod               # Go module definition
└── README.md            # This file
```

## Data Models

### Event
- ID, Name, Organizer
- Start/End dates
- Location, Prize pool
- Game type (PUBG/BGMI)
- Status (upcoming/ongoing/completed)
- Team count, Winner

### Team
- ID, Name, Logo, Region
- Game, Players list
- Event history, Win count

### Player
- ID, Name, Real name
- Team, Nationality
- Game, Event history
- Statistics (kills, damage, win rate)

### Match
- ID, Event ID, Match number
- Map, Mode, Date
- Team rankings and player stats

## Development Notes

- The backend currently uses mock data stored in memory
- All data is reset when the server restarts
- CORS is configured for frontend development
- Error handling includes fallback responses
- API responses include both data and metadata

## Future Enhancements

- Database integration (PostgreSQL)
- Authentication and authorization
- Real-time data updates
- File upload for images
- Caching layer
- Rate limiting
- API documentation (Swagger)