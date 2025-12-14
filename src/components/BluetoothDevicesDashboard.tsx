import { Bluetooth, BluetoothConnected, BluetoothSearching, Signal, SignalHigh, SignalLow, SignalMedium } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
  signalStrength: "low" | "medium" | "high";
  type: "phone" | "laptop" | "tablet" | "unknown";
}

// Mock Bluetooth devices for demonstration
const mockDevices: BluetoothDevice[] = [
  { id: "1", name: "iPhone 15 Pro", connected: true, signalStrength: "high", type: "phone" },
  { id: "2", name: "Galaxy S24", connected: false, signalStrength: "medium", type: "phone" },
  { id: "3", name: "MacBook Pro", connected: false, signalStrength: "low", type: "laptop" },
  { id: "4", name: "iPad Air", connected: true, signalStrength: "high", type: "tablet" },
  { id: "5", name: "Unknown Device", connected: false, signalStrength: "medium", type: "unknown" },
];

const SignalIcon = ({ strength }: { strength: "low" | "medium" | "high" }) => {
  switch (strength) {
    case "high":
      return <SignalHigh className="h-4 w-4 text-safe" />;
    case "medium":
      return <SignalMedium className="h-4 w-4 text-warning" />;
    case "low":
      return <SignalLow className="h-4 w-4 text-danger" />;
  }
};

interface BluetoothDevicesDashboardProps {
  isBluetoothEnabled: boolean;
}

export function BluetoothDevicesDashboard({ isBluetoothEnabled }: BluetoothDevicesDashboardProps) {
  const connectedCount = mockDevices.filter(d => d.connected).length;

  return (
    <Card className="glass border-border/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <BluetoothSearching className="h-5 w-5 text-primary" />
            </div>
            Available Devices
          </CardTitle>
          <Badge variant={isBluetoothEnabled ? "default" : "secondary"} className="gap-1">
            {isBluetoothEnabled ? (
              <>
                <BluetoothConnected className="h-3 w-3" />
                Active
              </>
            ) : (
              <>
                <Bluetooth className="h-3 w-3" />
                Off
              </>
            )}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {isBluetoothEnabled 
            ? `${connectedCount} connected • ${mockDevices.length - connectedCount} available nearby`
            : "Enable Bluetooth to discover nearby devices"}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {!isBluetoothEnabled ? (
          <div className="py-8 text-center">
            <Bluetooth className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">
              Bluetooth is disabled. Press the SOS button to enable.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {mockDevices.map((device) => (
              <div
                key={device.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                  device.connected 
                    ? "bg-safe/10 border border-safe/30" 
                    : "glass-subtle hover:bg-secondary/50"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg",
                  device.connected ? "bg-safe/20" : "bg-secondary"
                )}>
                  {device.connected ? (
                    <BluetoothConnected className="h-4 w-4 text-safe" />
                  ) : (
                    <Bluetooth className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "font-medium truncate",
                    device.connected ? "text-safe" : "text-foreground"
                  )}>
                    {device.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {device.type} • {device.signalStrength} signal
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <SignalIcon strength={device.signalStrength} />
                  {device.connected && (
                    <span className="h-2 w-2 rounded-full bg-safe animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
