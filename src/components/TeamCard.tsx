// src/components/TeamCard.tsx
import { Users, Trophy, MapPin, Globe } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Team } from "@/lib/api";
import { Link } from "react-router-dom";

interface TeamCardProps {
  team: Team;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const getGameColor = (game: string) => {
    return game === "PUBG" 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary/20 text-secondary-foreground border-secondary/30";
  };

  return (
    <Card className="group hover:shadow-glow-accent/20 transition-all duration-300 border-border/50 bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Using a placeholder for the logo */}
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Users className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {team.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge className={getGameColor(team.game)}>
                  {team.game}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" />
                  <span>{team.region}</span>
                </div>
              </div>
            </div>
          </div>
          {team.wins > 0 && (
            <div className="text-right">
              <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-accent font-medium">{team.wins} wins</p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{team.players.length} players</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>Founded {team.founded}</span>
          </div>
        </div>
        
        <Link to={`/teams/${team.id}`} className="block">
          <Button 
            className="w-full bg-gradient-gaming hover:opacity-90 transition-opacity"
            size="sm"
          >
            View Team
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TeamCard;