import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, Trophy } from "lucide-react";
import { apiService, Team, Event, TeamFilters } from "@/lib/api";
import TeamCard from "@/components/TeamCard";

// Helper function to get unique regions from events data
const getUniqueRegions = (teams: Team[]) => {
  const regions = new Set<string>();
  teams.forEach(team => regions.add(team.region));
  return Array.from(regions);
};

const TeamsPage = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTeams, setTotalTeams] = useState(0);
  const [filters, setFilters] = useState<TeamFilters>({});
  
  // Fetch all teams once to get unique filter options
  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const data = await apiService.getTeams();
        setAllTeams(data.teams);
      } catch (error) {
        console.error('Failed to fetch all teams for filters:', error);
      }
    };
    fetchAllTeams();
  }, []);

  // Fetch teams based on current filters
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const data = await apiService.getTeams(filters);
        setTeams(data.teams);
        setTotalTeams(data.total);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [filters]);

  const handleFilterChange = (key: keyof TeamFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };
  
  const regions = getUniqueRegions(allTeams);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary-foreground mb-4">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Esports Teams</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-gaming bg-clip-text text-transparent">
                  Elite Gaming Teams
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the best teams in the PUBG and BGMI competitive scene.
              </p>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search teams..."
                    className="pl-10 bg-card border-border"
                    // Note: The mock backend doesn't support search for teams, so this won't filter dynamically
                    // but the UI is ready for it if the backend is updated.
                    onChange={(e) => handleFilterChange('search', e.target.value)}
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

                <Select onValueChange={(value) => handleFilterChange('region', value)}>
                  <SelectTrigger className="w-full md:w-40 bg-card border-border">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region.toLowerCase()}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">{totalTeams}</div>
                <div className="text-xs text-muted-foreground">Total Teams</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-accent">
                  {allTeams.filter(t => t.game === "BGMI").length}
                </div>
                <div className="text-xs text-muted-foreground">BGMI Teams</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">
                  {allTeams.filter(t => t.game === "PUBG").length}
                </div>
                <div className="text-xs text-muted-foreground">PUBG Teams</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-muted-foreground">
                  {Math.max(...allTeams.map(t => t.wins || 0))}
                </div>
                <div className="text-xs text-muted-foreground">Most Wins</div>
              </div>
            </div>
          </div>
        </section>

        {/* Teams Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-lg text-muted-foreground">Loading teams...</div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeamsPage;
