// src/components/FeaturedEvents.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Trophy } from "lucide-react";
import { apiService, Event } from "@/lib/api";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  const [recentWinners, setRecentWinners] = useState<any[]>([]);
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, winnersData, liveData] = await Promise.all([
          apiService.getFeaturedEvents(),
          apiService.getRecentWinners(),
          apiService.getLiveEvents(),
        ]);

        setFeaturedEvents(eventsData);
        setRecentWinners(winnersData);
        setLiveEvents(liveData);
      } catch (error) {
        console.error('Failed to fetch featured events data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Loading events...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Featured Events</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-gaming bg-clip-text text-transparent">
              Latest Tournaments
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the most prestigious PUBG and BGMI tournaments happening around the world.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Trophy className="w-5 h-5" />
                Recent Winner
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentWinners[0] ? (
                <>
                  <div className="text-2xl font-bold mb-1">{recentWinners[0].winner}</div>
                  <div className="text-sm text-muted-foreground">{recentWinners[0].eventName}</div>
                  <div className="text-accent font-medium mt-2">{recentWinners[0].prizePool}</div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No recent winners</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Calendar className="w-5 h-5" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent>
              {featuredEvents.find(e => e.status === 'upcoming') ? (
                <>
                  <div className="text-2xl font-bold mb-1">
                    {featuredEvents.find(e => e.status === 'upcoming')?.name.split(' ')[0]}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting soon</div>
                  <div className="text-accent font-medium mt-2">
                    {featuredEvents.find(e => e.status === 'upcoming')?.prizePool}
                  </div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No upcoming events</div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Trophy className="w-5 h-5" />
                Live Now
              </CardTitle>
            </CardHeader>
            <CardContent>
              {liveEvents[0] ? (
                <>
                  <div className="text-2xl font-bold mb-1">{liveEvents[0].name.split(' ')[0]}</div>
                  <div className="text-sm text-muted-foreground">{liveEvents[0].location}</div>
                  <div className="text-accent font-medium mt-2">🔴 Live</div>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">No live events</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/events">
            <Button size="lg" className="bg-gradient-gaming hover:opacity-90 transition-opacity">
              View All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;