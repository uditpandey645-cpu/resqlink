import { useState, useCallback } from "react";

interface BluetoothState {
  isSupported: boolean;
  isEnabled: boolean;
  isConnecting: boolean;
  device: unknown;
  error: string | null;
}

export function useBluetooth() {
  const [state, setState] = useState<BluetoothState>({
    isSupported: "bluetooth" in navigator,
    isEnabled: false,
    isConnecting: false,
    device: null,
    error: null,
  });

  const requestBluetooth = useCallback(async (): Promise<boolean> => {
    if (!("bluetooth" in navigator)) {
      setState((prev) => ({
        ...prev,
        error: "Bluetooth is not supported on this device/browser",
      }));
      return false;
    }

    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      // Request Bluetooth device - this triggers the permission prompt
      const bluetooth = (navigator as Navigator & { bluetooth?: { requestDevice: (options: { acceptAllDevices: boolean; optionalServices: string[] }) => Promise<unknown> } }).bluetooth;
      
      if (!bluetooth) {
        throw new Error("Bluetooth API not available");
      }
      
      const device = await bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["generic_access"],
      });

      setState((prev) => ({
        ...prev,
        isEnabled: true,
        isConnecting: false,
        device,
        error: null,
      }));

      console.log("Bluetooth device connected:", (device as { name?: string })?.name || "Unknown device");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to enable Bluetooth";
      
      setState((prev) => ({
        ...prev,
        isEnabled: false,
        isConnecting: false,
        error: errorMessage,
      }));
      
      console.error("Bluetooth error:", error);
      return false;
    }
  }, []);

  const disconnect = useCallback(() => {
    const device = state.device as { gatt?: { connected?: boolean; disconnect: () => void } } | null;
    if (device?.gatt?.connected) {
      device.gatt.disconnect();
    }
    setState((prev) => ({
      ...prev,
      isEnabled: false,
      device: null,
    }));
  }, [state.device]);

  return {
    ...state,
    requestBluetooth,
    disconnect,
  };
}
