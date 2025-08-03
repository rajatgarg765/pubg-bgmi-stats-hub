
// src/pages/PlayerProfile.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiService, Player, Team, Event } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Target, Users, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const PlayerProfile = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerProfile = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const playerData = await apiService.getPlayerById(id);
        setPlayer(playerData);

        if (playerData.teamId) {
          const teamData = await apiService.getTeamById(playerData.teamId);
          setTeam(teamData);
        }
        
        // Fetch events for the player
        const eventsData = await apiService.getEvents({ teamId: playerData.teamId }); // Note: API needs teamId filter
        setEvents(eventsData.events);

      } catch (error) {
        console.error('Failed to fetch player profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlayerProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-muted-foreground">Loading player profile...</div>
        </main>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-destructive">Player not found.</div>
        </main>
      </div>
    );
  }
  
  const getGameColor = (game: string) => {
    return game === "PUBG" 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary/20 text-secondary-foreground border-secondary/30";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between border-b pb-8 border-border/50">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 ring-4 ring-offset-4 ring-offset-background ring-accent transition-all">
                <AvatarImage src={player.avatar} alt={player.name} />
                <AvatarFallback className="text-3xl bg-muted text-muted-foreground">{player.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">
                    <span className="bg-gradient-gaming bg-clip-text text-transparent">
                      {player.name}
                    </span>
                  </h1>
                  <Badge className={getGameColor(player.game)}>{player.game}</Badge>
                </div>
                <p className="text-lg text-muted-foreground">{player.realName}</p>
                {team && (
                  <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Team: 
                      <Link to={`/teams/${team.id}`} className="text-primary hover:underline ml-1">
                        {team.name}
                      </Link>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-accent">{player.totalKills.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Kills</div>
                </div>
                <div className="p-4 rounded-lg bg-card border border-border">
                  <div className="text-2xl font-bold text-primary">{player.winRate}%</div>
                  <div className="text-xs text-muted-foreground">Win Rate</div>
                </div>
            </div>
          </div>

          {/* Player Details */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-bold text-foreground">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{player.nationality}</span>
                <Badge className="ml-auto bg-muted text-muted-foreground">{player.id}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">Total Damage: {player.totalDamage.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Player Events */}
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
                      <Badge className={getGameColor(event.game)}>{event.game}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground">This player has not participated in any events yet.</div>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default PlayerProfile;
