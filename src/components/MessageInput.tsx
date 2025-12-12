import { useState } from "react";
import { Send, Mic, MapPin, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend: (message: string, attachments?: { type: string; data: string }[]) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoice = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationMsg = `📍 Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          onSend(locationMsg);
        },
        (error) => {
          console.error("Location error:", error);
        }
      );
    }
  };

  return (
    <div className="glass rounded-2xl p-3">
      <div className="flex items-end gap-2">
        {/* Attachment buttons */}
        <div className="flex gap-1 pb-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={handleLocation}
            disabled={disabled}
          >
            <MapPin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            disabled={disabled}
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
        </div>

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full resize-none bg-secondary/50 rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[44px] max-h-[120px]"
            rows={1}
            disabled={disabled}
          />
        </div>

        {/* Send/Voice button */}
        <div className="pb-1">
          {message.trim() ? (
            <Button
              variant="default"
              size="icon"
              className="h-9 w-9"
              onClick={handleSend}
              disabled={disabled}
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant={isRecording ? "sos" : "secondary"}
              size="icon"
              className={cn("h-9 w-9", isRecording && "animate-pulse")}
              onClick={handleVoice}
              disabled={disabled}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
