import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Trophy } from "lucide-react";
import EventCard from "@/components/EventCard";

const Events = () => {
  // Mock events data
  const events = [
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
    {
      id: "4",
      name: "BGMI Masters Cup 2024",
      organizer: "Krafton India",
      startDate: "2024-09-01",
      endDate: "2024-09-15",
      location: "Delhi, India",
      prizePool: "₹2,00,00,000",
      game: "BGMI" as const,
      status: "upcoming" as const,
      teams: 20,
    },
    {
      id: "5",
      name: "PUBG Nations Cup 2024",
      organizer: "Krafton",
      startDate: "2024-06-15",
      endDate: "2024-06-30",
      location: "Bangkok, Thailand",
      prizePool: "$1,500,000",
      game: "PUBG" as const,
      status: "completed" as const,
      teams: 16,
      winner: "Team Liquid",
    },
    {
      id: "6",
      name: "BGMI Open Challenge",
      organizer: "Krafton India",
      startDate: "2024-08-20",
      endDate: "2024-08-25",
      location: "Online",
      prizePool: "₹50,00,000",
      game: "BGMI" as const,
      status: "ongoing" as const,
      teams: 50,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header Section */}
        <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-4">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">All Events</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-gaming bg-clip-text text-transparent">
                  Tournament Events
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore comprehensive data from past, present, and upcoming PUBG and BGMI tournaments worldwide.
              </p>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search tournaments..."
                    className="pl-10 bg-card border-border"
                  />
                </div>
                
                <Select>
                  <SelectTrigger className="w-full md:w-40 bg-card border-border">
                    <SelectValue placeholder="Game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    <SelectItem value="pubg">PUBG</SelectItem>
                    <SelectItem value="bgmi">BGMI</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-full md:w-40 bg-card border-border">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-gradient-gaming hover:opacity-90">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">{events.length}</div>
                <div className="text-xs text-muted-foreground">Total Events</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-accent">
                  {events.filter(e => e.status === "ongoing").length}
                </div>
                <div className="text-xs text-muted-foreground">Live Now</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">
                  {events.filter(e => e.status === "upcoming").length}
                </div>
                <div className="text-xs text-muted-foreground">Upcoming</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-muted-foreground">
                  {events.filter(e => e.status === "completed").length}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;