import React, { createContext, ReactNode, useContext, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TShowToast } from "./types";

// Create Toast Context
const ToastContext = createContext<TShowToast | null>(null);

export const useCustomToast = () => useContext(ToastContext);

export const CustomToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "info", // 'info', 'success', 'error'
  });

  const insets = useSafeAreaInsets();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const showToast = ({
    message,
    type = "info",
    duration = 3000,
  }: {
    message: string;
    type: "info" | "success" | "error";
    duration: number;
  }) => {
    setToast({
      visible: true,
      message,
      type,
    });

    // Animate in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Auto hide after duration
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      });
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              opacity: fadeAnim,
              backgroundColor:
                toast.type === "success"
                  ? "#81C784"
                  : toast.type === "error"
                  ? "#FF8A80"
                  : "#81D4FA",
              bottom: insets.bottom + 50,
            },
          ]}
        >
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

//a bit too many inline styles, better to 'centralise them to a style sheet here'
const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 10,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 9999,
  },
  toastText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
