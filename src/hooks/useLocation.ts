import { useState, useCallback, useEffect, useRef } from "react";

export interface LocationState {
  isSupported: boolean;
  isPermissionGranted: boolean;
  isRequesting: boolean;
  isWatching: boolean;
  coordinates: { lat: number; lng: number } | null;
  accuracy: number | null;
  error: string | null;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    isSupported: "geolocation" in navigator,
    isPermissionGranted: false,
    isRequesting: false,
    isWatching: false,
    coordinates: null,
    accuracy: null,
    error: null,
  });

  const watchIdRef = useRef<number | null>(null);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!("geolocation" in navigator)) {
      setState((prev) => ({
        ...prev,
        error: "Geolocation is not supported on this device/browser",
      }));
      return false;
    }

    setState((prev) => ({ ...prev, isRequesting: true, error: null }));

    try {
      // Request current position - this triggers the permission prompt
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      setState((prev) => ({
        ...prev,
        isPermissionGranted: true,
        isRequesting: false,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        accuracy: position.coords.accuracy,
        error: null,
      }));

      return true;
    } catch (error) {
      let errorMessage = "Failed to get location";
      
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
      }

      setState((prev) => ({
        ...prev,
        isPermissionGranted: false,
        isRequesting: false,
        error: errorMessage,
      }));

      console.error("Location error:", error);
      return false;
    }
  }, []);

  const startWatching = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    if (watchIdRef.current !== null) return; // Already watching

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setState((prev) => ({
          ...prev,
          isWatching: true,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          accuracy: position.coords.accuracy,
          error: null,
        }));
        console.log("Live location update:", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error("Watch position error:", error);
        setState((prev) => ({
          ...prev,
          error: "Failed to track live location",
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    watchIdRef.current = watchId;
    setState((prev) => ({ ...prev, isWatching: true }));
  }, []);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setState((prev) => ({ ...prev, isWatching: false }));
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return {
    ...state,
    requestPermission,
    startWatching,
    stopWatching,
  };
}
