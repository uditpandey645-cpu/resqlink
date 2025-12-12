import { Bluetooth, BluetoothConnected, BluetoothOff, Loader2 } from "lucide-react";
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

interface BluetoothDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isConnecting: boolean;
  isEnabled: boolean;
  error: string | null;
  onEnableBluetooth: () => void;
  onProceed: () => void;
}

export function BluetoothDialog({
  open,
  onOpenChange,
  isConnecting,
  isEnabled,
  error,
  onEnableBluetooth,
  onProceed,
}: BluetoothDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-border/50 bg-background/95 backdrop-blur-xl">
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
                Bluetooth is enabled. You can now send SOS signals to nearby devices.
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
              onClick={onProceed}
              className="w-full bg-safe hover:bg-safe/90 text-safe-foreground"
            >
              Proceed with SOS
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
