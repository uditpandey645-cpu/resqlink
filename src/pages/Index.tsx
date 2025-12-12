import { useState, useEffect } from "react";
import { Radio, Wifi, WifiOff, Shield, Zap, Users, MapPin, AlertTriangle, MessageCircle } from "lucide-react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { SOSButton } from "@/components/SOSButton";
import { AlertCard, Alert } from "@/components/AlertCard";
import { MessageInput } from "@/components/MessageInput";
import { FeatureCard } from "@/components/FeatureCard";
import { MeshNetworkVisual } from "@/components/MeshNetworkVisual";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for alerts
const mockAlerts: Alert[] = [
  {
    id: "1",
    message: "Water rising rapidly near sector 7. Need immediate evacuation assistance.",
    location: { lat: 28.7041, lng: 77.1025 },
    timestamp: Date.now() - 300000,
    severity: "critical",
    status: "pending",
    sender: "Rescue Team Alpha",
    distance: 0.8,
  },
  {
    id: "2",
    message: "Family of 4 stranded on rooftop. Children need medical attention.",
    location: { lat: 28.6892, lng: 77.0892 },
    timestamp: Date.now() - 900000,
    severity: "high",
    status: "acknowledged",
    sender: "Local Volunteer",
    distance: 1.2,
  },
  {
    id: "3",
    message: "Relief supplies needed at community center. Food and water running low.",
    location: { lat: 28.7123, lng: 77.1156 },
    timestamp: Date.now() - 1800000,
    severity: "medium",
    status: "pending",
    sender: "Community Center",
    distance: 2.5,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [meshConnected, setMeshConnected] = useState(true);
  const [peerCount, setPeerCount] = useState(5);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Simulate mesh network activity
    const interval = setInterval(() => {
      setPeerCount(Math.floor(Math.random() * 8) + 2);
    }, 5000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  const handleSOS = () => {
    toast({
      title: "🚨 SOS Signal Sent!",
      description: "Your emergency signal is being broadcast to all nearby devices via mesh network.",
      variant: "destructive",
    });
  };

  const handleSendMessage = (message: string) => {
    toast({
      title: "Message Sent",
      description: "Your message is being relayed through the mesh network.",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-6 py-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
                <span className="h-2 w-2 rounded-full bg-safe animate-pulse" />
                <span className="text-muted-foreground">
                  {isOnline ? "Connected to network" : "Offline mode active"}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold font-display">
                Stay Connected
                <br />
                <span className="text-gradient-danger">When It Matters Most</span>
              </h2>

              <p className="text-muted-foreground max-w-md mx-auto">
                Peer-to-peer emergency communication that works without internet. 
                Connect with nearby devices through Bluetooth, WiFi Direct, and WebRTC.
              </p>
            </section>

            {/* SOS Button Section */}
            <section className="flex justify-center py-8 animate-slide-up-delay-1">
              <SOSButton onSOS={handleSOS} />
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up-delay-2">
              <FeatureCard
                icon={Radio}
                title="Mesh Network"
                description="Connect peer-to-peer with nearby devices. Your messages hop through the network to reach anyone in range."
                variant="safe"
              />
              <FeatureCard
                icon={Shield}
                title="Offline First"
                description="Full functionality without internet. Data syncs automatically when connection returns."
                variant="default"
              />
              <FeatureCard
                icon={Zap}
                title="AI Triage"
                description="Automatic priority classification of emergencies using AI to help responders act fast."
                variant="warning"
              />
              <FeatureCard
                icon={MapPin}
                title="Location Sharing"
                description="Share your GPS coordinates with rescuers. Works even without data connection."
                variant="danger"
              />
            </section>

            {/* Mesh Network Visualization */}
            <section className="animate-slide-up-delay-3">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold font-display">Network Status</h3>
                  <span className="text-sm text-safe font-medium">{peerCount} devices nearby</span>
                </div>
                <MeshNetworkVisual />
              </div>
            </section>
          </div>
        );

      case "alerts":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold font-display">Emergency Alerts</h2>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                {mockAlerts.filter((a) => a.status === "pending").length} active
              </span>
            </div>

            <div className="space-y-4">
              {mockAlerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="flex flex-col h-[calc(100vh-12rem)]">
            <h2 className="text-2xl font-bold font-display mb-4">Messages</h2>
            
            <div className="flex-1 space-y-4 overflow-y-auto pb-4">
              {/* Sample messages */}
              <div className="glass rounded-xl p-4 max-w-[80%]">
                <p className="text-sm font-medium text-safe mb-1">Rescue Team</p>
                <p className="text-sm text-foreground">Heading to your area. ETA 15 minutes. Stay safe.</p>
                <p className="text-xs text-muted-foreground mt-2">2 min ago • via mesh</p>
              </div>
              
              <div className="glass rounded-xl p-4 max-w-[80%] ml-auto">
                <p className="text-sm font-medium text-primary mb-1">You</p>
                <p className="text-sm text-foreground">We have 3 people here. One elderly needs medication.</p>
                <p className="text-xs text-muted-foreground mt-2">5 min ago • delivered</p>
              </div>

              <div className="glass rounded-xl p-4 max-w-[80%]">
                <p className="text-sm font-medium text-warning mb-1">Community Alert</p>
                <p className="text-sm text-foreground">Avoid the main bridge. Water level critical.</p>
                <p className="text-xs text-muted-foreground mt-2">12 min ago • broadcast</p>
              </div>
            </div>

            <MessageInput onSend={handleSendMessage} />
          </div>
        );

      case "map":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Area Map</h2>
            
            <div className="glass rounded-2xl aspect-video flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="text-foreground font-medium">Map View</p>
                  <p className="text-sm text-muted-foreground">
                    Shows nearby alerts, rescue teams, and safe zones
                  </p>
                </div>
                <Button variant="outline">
                  Enable Location
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-primary">{mockAlerts.length}</p>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-safe">{peerCount}</p>
                <p className="text-sm text-muted-foreground">Nearby Devices</p>
              </div>
            </div>
          </div>
        );

      case "network":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display">Network Status</h2>

            {/* Connection Cards */}
            <div className="space-y-4">
              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${isOnline ? "gradient-safe" : "bg-warning"}`}>
                  {isOnline ? <Wifi className="h-6 w-6 text-safe-foreground" /> : <WifiOff className="h-6 w-6 text-warning-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Internet Connection</p>
                  <p className="text-sm text-muted-foreground">
                    {isOnline ? "Connected - Full sync enabled" : "Offline - Using mesh network"}
                  </p>
                </div>
                <span className={`h-3 w-3 rounded-full ${isOnline ? "bg-safe" : "bg-warning"}`} />
              </div>

              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl gradient-safe">
                  <Radio className="h-6 w-6 text-safe-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Mesh Network</p>
                  <p className="text-sm text-muted-foreground">
                    {peerCount} devices connected nearby
                  </p>
                </div>
                <span className="h-3 w-3 rounded-full bg-safe status-blink" />
              </div>

              <div className="glass rounded-xl p-4 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-secondary">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Peer Discovery</p>
                  <p className="text-sm text-muted-foreground">
                    Scanning for new devices...
                  </p>
                </div>
                <span className="h-3 w-3 rounded-full bg-muted-foreground animate-pulse" />
              </div>
            </div>

            {/* Network Visual */}
            <MeshNetworkVisual />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-foreground">247</p>
                <p className="text-xs text-muted-foreground">Messages Relayed</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">SOS Forwarded</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-xl font-bold text-foreground">89%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Header
        isOnline={isOnline}
        meshConnected={meshConnected}
        peerCount={peerCount}
      />

      <main className="container mx-auto px-4 pt-32 md:pt-24 pb-24">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
