import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: true }} />
        </Stack>
        <StatusBar style="auto" />
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
