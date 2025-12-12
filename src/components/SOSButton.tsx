import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SOSButtonProps {
  onSOS: () => void;
  disabled?: boolean;
}

export function SOSButton({ onSOS, disabled }: SOSButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const handleMouseDown = () => {
    if (disabled) return;
    setIsPressed(true);
    
    const startTime = Date.now();
    const holdDuration = 1500; // 1.5 seconds to activate
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / holdDuration) * 100, 100);
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        onSOS();
        setIsPressed(false);
        setHoldProgress(0);
      }
    }, 50);

    const handleMouseUp = () => {
      clearInterval(interval);
      setIsPressed(false);
      setHoldProgress(0);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
  };

  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Pulse rings container */}
      <div className="relative">
        {/* Animated pulse rings */}
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            !disabled && "sos-pulse"
          )}
        />
        
        {/* Progress ring */}
        <svg
          className="absolute inset-0 -rotate-90 h-full w-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary) / 0.2)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${holdProgress * 2.89} 289`}
            className="transition-all duration-75"
          />
        </svg>

        {/* Main SOS button */}
        <Button
          variant="sos"
          size="icon-xl"
          className={cn(
            "relative z-10 h-28 w-28 rounded-full text-2xl",
            isPressed && "scale-95"
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          disabled={disabled}
        >
          <div className="flex flex-col items-center gap-1">
            <AlertTriangle className="h-8 w-8" />
            <span>SOS</span>
          </div>
        </Button>
      </div>

      {/* Instructions */}
      <p className="text-sm text-muted-foreground text-center">
        {isPressed ? (
          <span className="text-primary font-medium">Keep holding...</span>
        ) : (
          "Hold to send emergency signal"
        )}
      </p>
    </div>
  );
}
