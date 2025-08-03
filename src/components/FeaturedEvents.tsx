import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Trophy } from "lucide-react";
import EventCard from "./EventCard";

const FeaturedEvents = () => {
  // Mock data for featured events
  const featuredEvents = [
    {
      id: "1",
      name: "PUBG Mobile World Championship 2024",
      organizer: "Krafton",
      startDate: "2024-08-15",
      endDate: "2024-08-25",
      location: "Seoul, South Korea",
      prizePool: "$3,000,000",
      game: "PUBG" as const,
      status: "upcoming" as const,
      teams: 32,
    },
    {
      id: "2", 
      name: "BGMI Pro League Season 3",
      organizer: "Krafton India",
      startDate: "2024-07-01",
      endDate: "2024-07-20",
      location: "Mumbai, India",
      prizePool: "₹1,50,00,000",
      game: "BGMI" as const,
      status: "completed" as const,
      teams: 18,
      winner: "Team SouL",
    },
    {
      id: "3",
      name: "PUBG Continental Series",
      organizer: "Krafton",
      startDate: "2024-08-01",
      endDate: "2024-08-10",
      location: "Online",
      prizePool: "$2,000,000",
      game: "PUBG" as const,
      status: "ongoing" as const,
      teams: 24,
    },
  ];

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
              <div className="text-2xl font-bold mb-1">Team SouL</div>
              <div className="text-sm text-muted-foreground">BGMI Pro League S3 Champions</div>
              <div className="text-accent font-medium mt-2">₹50,00,000 Prize</div>
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
              <div className="text-2xl font-bold mb-1">PMWC 2024</div>
              <div className="text-sm text-muted-foreground">Starting in 5 days</div>
              <div className="text-accent font-medium mt-2">$3M Prize Pool</div>
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
              <div className="text-2xl font-bold mb-1">PCS 2024</div>
              <div className="text-sm text-muted-foreground">Day 3 - Finals</div>
              <div className="text-accent font-medium mt-2">🔴 Live</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-gaming hover:opacity-90 transition-opacity">
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;