import { Heart, Linkedin, Github, Mail, Award, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import uditPhoto from "@/assets/udit-photo.jpg";

export function FounderSection() {
  return (
    <Card className="glass border-border/30 overflow-hidden relative">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-safe/5" />
      
      <CardContent className="pt-6 pb-6 relative">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Founder Avatar with glow effect */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-safe rounded-full blur-xl opacity-30 animate-pulse" />
            <div className="relative h-24 w-24 rounded-full ring-4 ring-background shadow-2xl overflow-hidden">
              <img 
                src={uditPhoto} 
                alt="Udit Pandey - Founder" 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-safe rounded-full p-1.5 ring-2 ring-background">
              <Award className="h-4 w-4 text-safe-foreground" />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-bold font-display text-foreground">
                Udit Pandey
              </h3>
              <Sparkles className="h-4 w-4 text-warning animate-pulse" />
            </div>
            <Badge variant="outline" className="border-primary/30 text-primary">
              <Heart className="h-3 w-3 mr-1 fill-danger text-danger" />
              Founder & Creator
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Building technology that saves lives. ResQLink is my vision to ensure 
            no one is ever truly disconnected during emergencies.
          </p>

          {/* Mission Statement */}
          <div className="glass-subtle rounded-xl p-4 w-full">
            <p className="text-xs text-muted-foreground italic">
              "When networks fail, communities shouldn't. That's why I built ResQLink."
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://www.linkedin.com/in/udit-pandey-b30191384" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl glass-subtle hover:bg-[#0077B5]/20 transition-colors group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4 text-[#0077B5] group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-xl glass-subtle hover:bg-foreground/10 transition-colors group"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4 text-foreground group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#" 
              className="p-2.5 rounded-xl glass-subtle hover:bg-danger/20 transition-colors group"
              aria-label="Email"
            >
              <Mail className="h-4 w-4 text-danger group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
