import { Bluetooth, BluetoothConnected, BluetoothOff, Loader2, MapPin, MapPinOff } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

type DialogStep = "bluetooth" | "location" | "complete";

interface BluetoothDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConnecting: boolean;
  isEnabled: boolean;
  error: string | null;
  onEnableBluetooth: () => void;
  onProceed: () => void;
  // Location props
  step: DialogStep;
  isRequestingLocation: boolean;
  isLocationGranted: boolean;
  locationError: string | null;
  coordinates: { lat: number; lng: number } | null;
  accuracy: number | null;
  onRequestLocation: () => void;
}

export function BluetoothDialog({
  open,
  onOpenChange,
  isConnecting,
  isEnabled,
  error,
  onEnableBluetooth,
  onProceed,
  step,
  isRequestingLocation,
  isLocationGranted,
  locationError,
  coordinates,
  accuracy,
  onRequestLocation,
}: BluetoothDialogProps) {
  
  const renderBluetoothStep = () => (
    <>
      <AlertDialogHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {isConnecting ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : isEnabled ? (
            <BluetoothConnected className="h-8 w-8 text-safe" />
          ) : error ? (
            <BluetoothOff className="h-8 w-8 text-danger" />
          ) : (
            <Bluetooth className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <AlertDialogTitle className="text-center text-xl">
          {isConnecting
            ? "Connecting Bluetooth..."
            : isEnabled
            ? "Bluetooth Connected!"
            : error
            ? "Bluetooth Error"
            : "Enable Bluetooth"}
        </AlertDialogTitle>
        
        <AlertDialogDescription className="text-center">
          {isConnecting ? (
            "Please wait while we connect to nearby devices..."
          ) : isEnabled ? (
            <span className="text-safe">
              Bluetooth is enabled. Next, we need your location.
            </span>
          ) : error ? (
            <span className="text-danger">{error}</span>
          ) : (
            "To send emergency SOS signals offline, we need to enable Bluetooth for peer-to-peer communication."
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
        {isEnabled ? (
          <AlertDialogAction
            onClick={onRequestLocation}
            className="w-full bg-safe hover:bg-safe/90 text-safe-foreground"
          >
            Continue to Location
          </AlertDialogAction>
        ) : (
          <>
            <AlertDialogAction
              onClick={onEnableBluetooth}
              disabled={isConnecting}
              className={cn(
                "w-full",
                isConnecting && "opacity-50 cursor-not-allowed"
              )}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : error ? (
                "Try Again"
              ) : (
                "Enable Bluetooth"
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          </>
        )}
      </AlertDialogFooter>
    </>
  );

  const renderLocationStep = () => (
    <>
      <AlertDialogHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {isRequestingLocation ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : isLocationGranted ? (
            <MapPin className="h-8 w-8 text-safe" />
          ) : locationError ? (
            <MapPinOff className="h-8 w-8 text-danger" />
          ) : (
            <MapPin className="h-8 w-8 text-primary" />
          )}
        </div>
        
        <AlertDialogTitle className="text-center text-xl">
          {isRequestingLocation
            ? "Getting Location..."
            : isLocationGranted
            ? "Location Captured!"
            : locationError
            ? "Location Error"
            : "Enable Location"}
        </AlertDialogTitle>
        
        <AlertDialogDescription className="text-center">
          {isRequestingLocation ? (
            "Please wait while we capture your live location..."
          ) : isLocationGranted && coordinates ? (
            <span className="text-safe">
              <span className="block">Location captured successfully!</span>
              <span className="block mt-2 text-xs font-mono">
                Lat: {coordinates.lat.toFixed(6)}
              </span>
              <span className="block text-xs font-mono">
                Lng: {coordinates.lng.toFixed(6)}
              </span>
              {accuracy && (
                <span className="block text-xs text-muted-foreground mt-1">
                  Accuracy: ±{accuracy.toFixed(0)}m
                </span>
              )}
            </span>
          ) : locationError ? (
            <span className="text-danger">{locationError}</span>
          ) : (
            "We need your location to send accurate SOS signals to nearby rescuers."
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
        {isLocationGranted ? (
          <AlertDialogAction
            onClick={onProceed}
            className="w-full bg-safe hover:bg-safe/90 text-safe-foreground"
          >
            Send SOS Now
          </AlertDialogAction>
        ) : (
          <>
            <AlertDialogAction
              onClick={onRequestLocation}
              disabled={isRequestingLocation}
              className={cn(
                "w-full",
                isRequestingLocation && "opacity-50 cursor-not-allowed"
              )}
            >
              {isRequestingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Location...
                </>
              ) : locationError ? (
                "Try Again"
              ) : (
                "Enable Location"
              )}
            </AlertDialogAction>
            <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
          </>
        )}
      </AlertDialogFooter>
    </>
  );

  const renderCompleteStep = () => (
    <>
      <AlertDialogHeader>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-safe/20">
          <MapPin className="h-8 w-8 text-safe" />
        </div>
        
        <AlertDialogTitle className="text-center text-xl text-safe">
          Ready to Send SOS!
        </AlertDialogTitle>
        
        <AlertDialogDescription className="text-center">
          <span className="block text-safe">All permissions granted.</span>
          {coordinates && (
            <span className="block mt-2 text-xs font-mono">
              📍 {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
            </span>
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
        <AlertDialogAction
          onClick={onProceed}
          className="w-full bg-danger hover:bg-danger/90 text-danger-foreground"
        >
          🚨 Send SOS Now
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-border/50 bg-background/95 backdrop-blur-xl">
        {step === "bluetooth" && renderBluetoothStep()}
        {step === "location" && renderLocationStep()}
        {step === "complete" && renderCompleteStep()}
      </AlertDialogContent>
    </AlertDialog>
  );
}
