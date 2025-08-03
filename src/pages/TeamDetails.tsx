
// src/pages/TeamDetails.tsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService, Team, Player, Event } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users, Trophy, MapPin, Globe, Briefcase } from "lucide-react";

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const teamData = await apiService.getTeamById(id);
        setTeam(teamData);
        
        // Fetch players and events for the team
        const playersData = await apiService.getPlayers({ teamId: id });
        setPlayers(playersData.players);

        const eventsData = await apiService.getEvents({ teamId: id });
        setEvents(eventsData.events);

      } catch (error) {
        console.error('Failed to fetch team details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-muted-foreground">Loading team details...</div>
        </main>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-destructive">Team not found.</div>
        </main>
      </div>
    );
  }
  
  const getGameColor = (game: string) => {
    return game === "PUBG" 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary/20 text-secondary-foreground border-secondary/30";
  };
  
  const getEventStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary/20 text-primary border-primary/30";
      case "ongoing":
        return "bg-accent/20 text-accent border-accent/30";
      case "completed":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Team Header */}
          <div className="flex items-start justify-between border-b pb-8 border-border/50">
            <div className="flex items-center gap-6">
              {/* Using a placeholder for the logo */}
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center ring-4 ring-offset-4 ring-offset-background ring-accent transition-all">
                <Users className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">
                    <span className="bg-gradient-gaming bg-clip-text text-transparent">
                      {team.name}
                    </span>
                  </h1>
                  <Badge className={getGameColor(team.game)}>{team.game}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">Founded: {team.founded}</p>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Region: {team.region}</span>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-accent">{team.wins}</div>
                  <div className="text-xs text-muted-foreground">Total Wins</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary">{team.players.length}</div>
                  <div className="text-xs text-muted-foreground">Players</div>
                </div>
            </div>
          </div>

          {/* Roster */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-foreground">Roster</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {players.length > 0 ? (
                  players.map(player => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full object-cover" />
                        <Link to={`/players/${player.id}`} className="text-primary font-medium hover:underline">
                          {player.name}
                        </Link>
                      </div>
                      <Badge variant="secondary">{player.nationality}</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-muted-foreground">No player data available.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Events */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-foreground">Participated Events</CardTitle>
            </CardHeader>
            <CardContent>
              {events.length > 0 ? (
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="flex items-center justify-between">
                      <Link to={`/events/${event.id}`} className="text-primary hover:underline">
                        {event.name}
                      </Link>
                      <Badge className={getEventStatusColor(event.status)}>{event.status}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">This team has not participated in any events yet.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeamDetailsPage;