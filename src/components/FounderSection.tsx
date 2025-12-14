import { Heart, Linkedin, Github, Mail, Award, Sparkles, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import uditPhoto from "@/assets/udit-photo.jpg";

export function FounderSection() {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/20 via-safe/10 to-warning/20 backdrop-blur-xl">
      {/* Animated gradient orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/40 to-safe/40 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-warning/40 to-danger/40 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-safe/30 to-primary/30 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      
      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-warning/40 animate-[twinkle_2s_ease-in-out_infinite]"
            style={{
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 12 + 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-safe to-warning opacity-30 animate-[spin_8s_linear_infinite]" style={{ padding: '2px', mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
      
      <CardContent className="pt-8 pb-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-5">
          {/* Founder Avatar with animated ring */}
          <div className="relative group">
            {/* Outer rotating ring */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary via-safe to-warning animate-[spin_4s_linear_infinite] opacity-70" />
            <div className="absolute -inset-2 rounded-full bg-background" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-safe rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse" />
            
            {/* Photo container */}
            <div className="relative h-28 w-28 rounded-full ring-4 ring-primary/50 shadow-2xl shadow-primary/30 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              <img 
                src={uditPhoto} 
                alt="Udit Pandey - Founder" 
                className="h-full w-full object-cover"
              />
            </div>
            
            {/* Award badge */}
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-warning to-warning/80 rounded-full p-2 ring-2 ring-background shadow-lg animate-bounce">
              <Award className="h-4 w-4 text-warning-foreground" />
            </div>
          </div>

          {/* Name and Title with gradient text */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-2xl font-bold font-display bg-gradient-to-r from-primary via-safe to-warning bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                Udit Pandey
              </h3>
              <Sparkles className="h-5 w-5 text-warning animate-[twinkle_1s_ease-in-out_infinite]" />
            </div>
            <Badge className="bg-gradient-to-r from-primary/20 to-safe/20 border-primary/40 text-primary hover:from-primary/30 hover:to-safe/30 transition-all px-4 py-1">
              <Heart className="h-3 w-3 mr-1.5 fill-danger text-danger animate-pulse" />
              Founder & Creator
            </Badge>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/80 max-w-xs leading-relaxed">
            Building technology that saves lives. ResQLink is my vision to ensure 
            no one is ever truly disconnected during emergencies.
          </p>

          {/* Mission Statement with animated border */}
          <div className="relative w-full group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-safe to-warning rounded-xl opacity-50 group-hover:opacity-100 blur transition-opacity" />
            <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-4">
              <p className="text-xs text-foreground/70 italic">
                "When networks fail, communities shouldn't. That's why I built ResQLink."
              </p>
            </div>
          </div>

          {/* Social Links with colors and animations */}
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="https://www.linkedin.com/in/udit-pandey-b30191384" 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#0077B5]/20 hover:bg-[#0077B5]/40 border border-[#0077B5]/30 transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-[#0077B5]/20"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-[#0077B5] group-hover:animate-bounce" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-xl bg-foreground/10 hover:bg-foreground/20 border border-foreground/20 transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-foreground/10"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-foreground group-hover:animate-bounce" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-xl bg-danger/20 hover:bg-danger/40 border border-danger/30 transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-danger/20"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-danger group-hover:animate-bounce" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
