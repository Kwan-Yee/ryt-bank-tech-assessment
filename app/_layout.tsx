import { Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";
import { tamaguiConfig } from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Toast, ToastProvider, ToastViewport } from "@tamagui/toast";
import { CustomToastProvider } from "@/context/toast";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={tamaguiConfig}>
        <SafeAreaProvider>
          <CustomToastProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="transactions"
                options={{
                  title: "History",
                  headerStyle: {
                    backgroundColor: "#f4f4f5",
                  },
                  headerTintColor: "#18181b",
                  headerShadowVisible: false,
                  headerShown: false,
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
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </CustomToastProvider>
        </SafeAreaProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
