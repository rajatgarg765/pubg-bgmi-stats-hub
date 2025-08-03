import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event types
export interface Event {
  id: string;
  name: string;
  organizer: string;
  startDate: string;
  endDate: string;
  location: string;
  prizePool: string;
  game: 'PUBG' | 'BGMI';
  status: 'upcoming' | 'ongoing' | 'completed';
  teams: number;
  winner?: string;
  featured: boolean;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  region: string;
  game: string;
  players: string[];
  eventIds: string[];
  wins: number;
  founded: string;
}

export interface Player {
  id: string;
  name: string;
  realName: string;
  teamId: string;
  nationality: string;
  game: string;
  eventIds: string[];
  totalKills: number;
  totalDamage: number;
  winRate: number;
  avatar: string;
}

export interface Stats {
  totalTournaments: number;
  totalTeams: number;
  totalPlayers: number;
  ongoingEvents: number;
  completedEvents: number;
  upcomingEvents: number;
}

export interface EventFilters {
  game?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

// API functions
export const apiService = {
  // Stats
  getStats: async (): Promise<Stats> => {
    const response = await api.get('/stats');
    return response.data.stats;
  },

  getRecentWinners: async () => {
    const response = await api.get('/recent-winners');
    return response.data.winners;
  },

  getLiveEvents: async () => {
    const response = await api.get('/live-events');
    return response.data.liveEvents;
  },

  // Events
  getEvents: async (filters?: EventFilters): Promise<{ events: Event[]; total: number }> => {
    const response = await api.get('/events', { params: filters });
    return response.data;
  },

  getFeaturedEvents: async (): Promise<Event[]> => {
    const response = await api.get('/events/featured');
    return response.data.events;
  },

  getEventById: async (id: string): Promise<Event> => {
    const response = await api.get(`/events/${id}`);
    return response.data.event;
  },

  getEventMatches: async (eventId: string) => {
    const response = await api.get(`/events/${eventId}/matches`);
    return response.data.matches;
  },

  // Teams
  getTeams: async (filters?: { game?: string; region?: string; limit?: number }): Promise<{ teams: Team[]; total: number }> => {
    const response = await api.get('/teams', { params: filters });
    return response.data;
  },

  getTeamById: async (id: string): Promise<Team> => {
    const response = await api.get(`/teams/${id}`);
    return response.data.team;
  },

  // Players
  getPlayers: async (filters?: { game?: string; teamId?: string; limit?: number }): Promise<{ players: Player[]; total: number }> => {
    const response = await api.get('/players', { params: filters });
    return response.data;
  },

  getPlayerById: async (id: string): Promise<Player> => {
    const response = await api.get(`/players/${id}`);
    return response.data.player;
  },
};

export default api;