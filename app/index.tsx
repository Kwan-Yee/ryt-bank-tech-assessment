import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, Text, YStack, useTheme, XStack, Spinner } from "tamagui";
import { Calendar } from "@tamagui/lucide-icons";
import { useTransactionStore } from "../store";
import { authenticate } from "@/helpers/auth";

export default function LoginScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { setAuth, isAuthenticating, setIsAuthenticating } =
    useTransactionStore();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <YStack f={1} jc="center" ai="center" bg="$background" p="$4">
      <YStack space="$4" w="100%" maw={350} ai="center">
        {/* <Image
          source={require("../assets/bank-logo.png")}
          style={{ width: 120, height: 120 }}
          alt="Bank Logo"
          mb="$6"
        /> */}
        <Calendar size={18} color="$orange10" />

        <Text fontSize={28} fontWeight="bold" mb="$2" color="$color">
          Welcome
        </Text>

        <Text fontSize={16} mb="$6" ta="center" color="$color" o={0.7}>
          Sign in using your biometric credentials to access your account
        </Text>

        {errorMessage ? (
          <Text color="$red10" fontSize={14} mb="$4" ta="center">
            {errorMessage}
          </Text>
        ) : null}

        <Button
          bg="$blue10"
          color="white"
          size="$4"
          w="100%"
          onPress={() =>
            authenticate({
              setIsAuthenticating,
              setAuth,
              setErrorMessage,
              router,
            })
          }
          disabled={isAuthenticating}
        >
          {isAuthenticating ? (
            <XStack ai="center" space="$2">
              <Spinner color="white" />
              <Text color="white">Authenticating...</Text>
            </XStack>
          ) : (
            "Sign in with Biometrics"
          )}
        </Button>
      </YStack>
    </YStack>
  );
}
