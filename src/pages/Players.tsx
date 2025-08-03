// src/pages/Players.tsx
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Target, Users } from "lucide-react";
import { apiService, Player, PlayerFilters, Team } from "@/lib/api";
import PlayerCard from "@/components/PlayerCard";

const PlayersPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [filters, setFilters] = useState<PlayerFilters>({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [playersData, teamsData] = await Promise.all([
          apiService.getPlayers(filters),
          apiService.getTeams(),
        ]);
        setPlayers(playersData.players);
        setTotalPlayers(playersData.total);
        setTeams(teamsData.teams);
      } catch (error) {
        console.error('Failed to fetch players data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [filters]);

  const handleFilterChange = (key: keyof PlayerFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  const getTeamName = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    return team?.name || "N/A";
  };
  
  const getPlayerStats = () => {
    const totalKills = players.reduce((sum, p) => sum + p.totalKills, 0);
    const topPlayer = players.reduce((max, player) => (player.totalKills > max.totalKills ? player : max), { totalKills: 0 } as Player);

    return { totalKills, topPlayer };
  };

  const stats = getPlayerStats();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent-foreground mb-4">
                <Target className="w-4 h-4" />
                <span className="text-sm font-medium">Esports Players</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-gaming bg-clip-text text-transparent">
                  Meet the Top Players
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore detailed profiles, stats, and match history of professional PUBG and BGMI players.
              </p>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search players..."
                    className="pl-10 bg-card border-border"
                    // The mock backend doesn't support player search.
                  />
                </div>
                
                <Select onValueChange={(value) => handleFilterChange('game', value)}>
                  <SelectTrigger className="w-full md:w-40 bg-card border-border">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="pubg">PUBG</SelectItem>
                    <SelectItem value="bgmi">BGMI</SelectItem>
                  </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleFilterChange('teamId', value)}>
                  <SelectTrigger className="w-full md:w-40 bg-card border-border">
                    <SelectValue placeholder="Team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teams</SelectItem>
                    {teams.map(team => (
                      <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">{totalPlayers}</div>
                <div className="text-xs text-muted-foreground">Total Players</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-accent">
                  {stats.totalKills}
                </div>
                <div className="text-xs text-muted-foreground">Total Kills</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">
                  {stats.topPlayer.name || 'N/A'}
                </div>
                <div className="text-xs text-muted-foreground">Top Player</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-muted-foreground">
                  {stats.topPlayer.totalKills || 'N/A'}
                </div>
                <div className="text-xs text-muted-foreground">Top Player Kills</div>
              </div>
            </div>
          </div>
        </section>

        {/* Players Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-lg text-muted-foreground">Loading players...</div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {players.map((player) => (
                  <PlayerCard key={player.id} player={player} getTeamName={getTeamName} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PlayersPage;