// src/pages/EventDetails.tsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiService, Event, Match } from "@/lib/api";
import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const eventData = await apiService.getEventById(id);
        setEvent(eventData);

        // The mock backend does not have matches for all events,
        // so we'll add a fallback to prevent errors.
        try {
          const matchesData = await apiService.getEventMatches(id);
          setMatches(matchesData);
        } catch (matchError) {
          console.error('Failed to fetch matches for event:', matchError);
          setMatches([]);
        }

      } catch (error) {
        console.error('Failed to fetch event details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-muted-foreground">Loading event details...</div>
        </main>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center text-lg text-destructive">Event not found.</div>
        </main>
      </div>
    );
  }

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
  
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Event Header */}
          <div className="flex items-start justify-between border-b pb-8 border-border/50">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className={getGameColor(event.game)}>{event.game}</Badge>
                <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-gaming bg-clip-text text-transparent">
                  {event.name}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">{event.organizer}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Trophy className="w-5 h-5" />
                <span className="text-accent font-medium text-2xl">{event.prizePool}</span>
              </div>
              {event.status === "completed" && event.winner && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Winner:</p>
                  <p className="text-lg text-accent font-semibold">{event.winner}</p>
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Start Date: {formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>End Date: {formatDate(event.endDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Location: {event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Teams: {event.teams}</span>
              </div>
            </CardContent>
          </Card>

          {/* Event Matches */}
          {matches.length > 0 && (
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map(match => (
                    <div key={match.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-muted-foreground" />
                        <span>Match #{match.number}: {match.map} ({match.mode})</span>
                      </div>
                      <Badge variant="secondary">{formatDate(match.date)}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </main>
    </div>
  );
};

export default EventDetailsPage;