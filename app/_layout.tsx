import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  useEffect(() => {
    if (fontsLoaded) {
      // Font loaded
    }
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="transactions"
            options={{
              title: "Transactions",
              headerStyle: {
                backgroundColor: "#f4f4f5",
              },
              headerTintColor: "#18181b",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="transaction/[id]"
            options={{
              title: "Transaction Details",
              headerStyle: {
                backgroundColor: "#f4f4f5",
              },
              headerTintColor: "#18181b",
              headerShadowVisible: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
