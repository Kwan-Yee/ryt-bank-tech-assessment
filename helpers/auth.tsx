import { ITransactionStore } from "@/store/types";
import * as LocalAuthentication from "expo-local-authentication";
import { Router } from "expo-router";

export async function authenticate({
  setIsAuthenticating,
  setErrorMessage,
  setAuth,
  router,
}: Pick<ITransactionStore, "setIsAuthenticating" | "setAuth"> & {
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  router: Router;
}) {
  setIsAuthenticating(true);
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      throw new Error("This device does not support biometric authentication");
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      throw new Error("No biometrics enrolled on this device");
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to access your account",
      fallbackLabel: "Use passcode",
    });

    if (result.success) {
      setAuth(true);
      setIsAuthenticating(false);
      router.push("/transactions");
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error: any) {
    setErrorMessage(error.message);
    setIsAuthenticating(false);
  } finally {
    setAuth(false);
    setIsAuthenticating(false);
  }
}
