import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Trophy } from "lucide-react";
import { apiService, Event, EventFilters } from "@/lib/api";
import EventCard from "@/components/EventCard";

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEvents, setTotalEvents] = useState(0);
  const [filters, setFilters] = useState<EventFilters>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvents(filters);
        setEvents(data.events);
        setTotalEvents(data.total);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters]);

  const handleFilterChange = (key: keyof EventFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === 'all' ? undefined : value
    }));
  };

  const getEventStats = () => {
    const ongoing = events.filter(e => e.status === "ongoing").length;
    const upcoming = events.filter(e => e.status === "upcoming").length;
    const completed = events.filter(e => e.status === "completed").length;
    
    return { ongoing, upcoming, completed };
  };

  const stats = getEventStats();

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

                <Select onValueChange={(value) => handleFilterChange('status', value)}>
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
                <div className="text-xl font-bold text-primary">{totalEvents}</div>
                <div className="text-xs text-muted-foreground">Total Events</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-accent">{stats.ongoing}</div>
                <div className="text-xs text-muted-foreground">Live Now</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-primary">{stats.upcoming}</div>
                <div className="text-xs text-muted-foreground">Upcoming</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card border border-border">
                <div className="text-xl font-bold text-muted-foreground">{stats.completed}</div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">
                <div className="text-lg text-muted-foreground">Loading events...</div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Events;