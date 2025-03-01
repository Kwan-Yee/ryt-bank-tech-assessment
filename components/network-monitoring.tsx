import React, { useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useCustomToast } from "@/context/toast";

export function NetworkMonitor() {
  const { showToast } = useCustomToast()!;

  useEffect(() => {
    // Variable to track if we've already shown the offline toast
    let isOfflineToastShown = false;

    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (
        !state.isConnected &&
        !state.isInternetReachable &&
        !isOfflineToastShown
      ) {
        showToast({
          message: "No internet connection",
          type: "error",
          duration: 3000,
        });
        isOfflineToastShown = true;
      }

      // Reset the flag when connection is restored
      if (
        state.isConnected &&
        state.isInternetReachable &&
        isOfflineToastShown
      ) {
        showToast({
          message: "Connection established",
          type: "success",
          duration: 3000,
        });
        isOfflineToastShown = false;
      }
    });

    // Initial check
    NetInfo.fetch().then((state) => {
      if (!state.isConnected || !state.isInternetReachable) {
        showToast({
          message: "No internet connection",
          type: "error",
          duration: 3000,
        });
        isOfflineToastShown = true;
      }
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
