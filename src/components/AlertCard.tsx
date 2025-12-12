import { MapPin, Clock, AlertTriangle, CheckCircle, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Alert {
  id: string;
  message: string;
  location: { lat: number; lng: number };
  timestamp: number;
  severity: "low" | "medium" | "high" | "critical";
  status: "pending" | "acknowledged" | "resolved";
  sender: string;
  distance?: number;
}

interface AlertCardProps {
  alert: Alert;
}

const severityConfig = {
  low: {
    bg: "bg-secondary",
    border: "border-safe/30",
    badge: "bg-safe/20 text-safe",
    icon: CheckCircle,
  },
  medium: {
    bg: "bg-secondary",
    border: "border-warning/30",
    badge: "bg-warning/20 text-warning",
    icon: AlertTriangle,
  },
  high: {
    bg: "bg-secondary",
    border: "border-primary/30",
    badge: "bg-primary/20 text-primary",
    icon: AlertTriangle,
  },
  critical: {
    bg: "bg-primary/10",
    border: "border-primary/50",
    badge: "bg-primary text-primary-foreground",
    icon: AlertTriangle,
  },
};

export function AlertCard({ alert }: AlertCardProps) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;
  
  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all hover:scale-[1.01]",
        config.bg,
        config.border,
        alert.severity === "critical" && "glow-danger"
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            config.badge
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-foreground truncate">
              {alert.sender}
            </span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                config.badge
              )}
            >
              {alert.severity}
            </span>
          </div>
          
          <p className="text-sm text-foreground/90 mb-3 line-clamp-2">
            {alert.message}
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(alert.timestamp)}</span>
            </div>
            
            {alert.distance && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                <span>{alert.distance.toFixed(1)} km away</span>
              </div>
            )}
            
            <div className="flex items-center gap-1 text-safe">
              <Radio className="h-3.5 w-3.5" />
              <span>Mesh relay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
