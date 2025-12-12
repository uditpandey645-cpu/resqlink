import { Radio, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "./ConnectionStatus";

interface HeaderProps {
  isOnline: boolean;
  meshConnected: boolean;
  peerCount: number;
  onMenuClick?: () => void;
}

export function Header({ isOnline, meshConnected, peerCount, onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-danger">
            <Radio className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-foreground">ResQLink</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Offline Emergency Network
            </p>
          </div>
        </div>

        {/* Connection Status - Hidden on mobile */}
        <div className="hidden md:block">
          <ConnectionStatus
            isOnline={isOnline}
            meshConnected={meshConnected}
            peerCount={peerCount}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile connection status */}
      <div className="md:hidden border-t border-border/50 px-4 py-2 flex justify-center">
        <ConnectionStatus
          isOnline={isOnline}
          meshConnected={meshConnected}
          peerCount={peerCount}
        />
      </div>
    </header>
  );
}
