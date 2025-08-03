// src/components/HeroSection.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Trophy } from "lucide-react";
import { apiService, Stats } from "@/lib/api";
import heroImage from "@/assets/hero-esports.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await apiService.getStats();
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback stats in case of API error
        setStats({
          totalTournaments: 250,
          totalTeams: 1200,
          totalPlayers: 5000,
          ongoingEvents: 0,
          completedEvents: 0,
          upcomingEvents: 0,
        });
      }
    };

    fetchStats();
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="PUBG BGMI Esports Tournament"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/80 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 border border-accent/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-primary/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-medium">Professional Esports Analytics</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-gaming bg-clip-text text-transparent">
              PUBG & BGMI
            </span>
            <br />
            <span className="text-foreground">
              Esports Hub
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive statistics, tournament data, and professional insights for 
            the competitive PUBG and BGMI esports ecosystem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/events">
              <Button 
                size="lg" 
                className="bg-gradient-gaming hover:opacity-90 transition-opacity shadow-glow-primary text-white px-8 py-3 text-lg"
              >
                Explore Tournaments
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:bg-muted transition-colors px-8 py-3 text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Highlights
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stats?.totalTournaments || '---'}+
              </div>
              <div className="text-sm text-muted-foreground">Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {stats?.totalTeams || '---'}+
              </div>
              <div className="text-sm text-muted-foreground">Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stats?.totalPlayers || '---'}+
              </div>
              <div className="text-sm text-muted-foreground">Players</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;