
// src/components/EventCard.tsx
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Event } from "@/lib/api";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const getStatusColor = (status: string) => {
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

  const getGameColor = (game: string) => {
    return game === "PUBG" 
      ? "bg-primary/20 text-primary border-primary/30"
      : "bg-secondary/20 text-secondary-foreground border-secondary/30";
  };

  return (
    <Card className="group hover:shadow-glow-primary/20 transition-all duration-300 border-border/50 bg-gradient-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={getGameColor(event.game)}>
                {event.game}
              </Badge>
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {event.name}
            </h3>
            <p className="text-sm text-muted-foreground">{event.organizer}</p>
          </div>
          {event.status === "completed" && event.winner && (
            <div className="text-right">
              <Trophy className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-accent font-medium">{event.winner}</p>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{event.teams} teams</span>
          </div>
          <div className="flex items-center gap-2 text-accent font-medium">
            <Trophy className="w-4 h-4" />
            <span>{event.prizePool}</span>
          </div>
        </div>
        
        <Link to={`/events/${event.id}`} className="block">
          <Button 
            className="w-full bg-gradient-gaming hover:opacity-90 transition-opacity"
            size="sm"
          >
            View Event
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventCard;