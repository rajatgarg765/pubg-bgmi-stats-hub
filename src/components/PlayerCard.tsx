import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Target, Users } from "lucide-react";
import { Player } from "@/lib/api";
import { Link } from "react-router-dom";

interface PlayerCardProps {
  player: Player;
  getTeamName: (teamId: string) => string;
}

const PlayerCard = ({ player, getTeamName }: PlayerCardProps) => {
  const getGameColor = (game: string) => {
    return game === "PUBG" 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary/20 text-secondary-foreground border-secondary/30";
  };

  return (
    <Card className="group hover:shadow-glow-accent/20 transition-all duration-300 border-border/50 bg-gradient-card">
      <CardHeader className="flex flex-row items-center gap-4 pb-3">
        <Avatar className="h-16 w-16 group-hover:ring-2 ring-offset-2 ring-offset-background ring-accent transition-all">
          <AvatarImage src={player.avatar} alt={player.name} />
          <AvatarFallback className="bg-muted text-muted-foreground">{player.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {player.name}
            </h3>
            <Badge className={getGameColor(player.game)}>
              {player.game}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{getTeamName(player.teamId)}</p>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>{player.totalKills.toLocaleString()} Kills</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>{player.winRate}% Win Rate</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{player.nationality}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-4 h-4" />
            <span>{player.totalDamage.toLocaleString()} Damage</span>
          </div>
        </div>
        
        <Link to={`/players/${player.id}`} className="block">
          <Button 
            className="w-full bg-gradient-gaming hover:opacity-90 transition-opacity"
            size="sm"
          >
            View Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
