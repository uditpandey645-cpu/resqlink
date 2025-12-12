import { Wifi, WifiOff, Radio, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConnectionStatusProps {
  isOnline: boolean;
  meshConnected: boolean;
  peerCount: number;
}

export function ConnectionStatus({ isOnline, meshConnected, peerCount }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-4">
      {/* Internet Status */}
      <div className="flex items-center gap-2">
        {isOnline ? (
          <div className="flex items-center gap-1.5 text-safe">
            <Wifi className="h-4 w-4" />
            <span className="text-xs font-medium">Online</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-warning">
            <WifiOff className="h-4 w-4" />
            <span className="text-xs font-medium">Offline</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-4 w-px bg-border" />

      {/* Mesh Network Status */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex items-center gap-1.5",
            meshConnected ? "text-safe" : "text-muted-foreground"
          )}
        >
          <Radio
            className={cn(
              "h-4 w-4",
              meshConnected && "status-blink"
            )}
          />
          <span className="text-xs font-medium">
            {meshConnected ? "Mesh Active" : "No Mesh"}
          </span>
        </div>
      </div>

      {/* Peer Count */}
      {meshConnected && peerCount > 0 && (
        <>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1.5 text-foreground">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium">{peerCount} peers</span>
          </div>
        </>
      )}
    </div>
  );
}
