import { ITransactionStore } from "@/store/types";
import { LogOut, Eye, EyeOff } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { YStack, XStack, Text, Button } from "tamagui";
import * as LocalAuthentication from "expo-local-authentication";
import { TShowToast } from "@/context/types";

export const renderHeader = ({
  isMasked,
  setIsMasked,
  logout,
  showToast,
}: {
  isMasked: boolean;
  setIsMasked: React.Dispatch<React.SetStateAction<boolean>>;
  logout: ITransactionStore["logout"];
  showToast: TShowToast["showToast"];
}) => {
  const handleBiometricAuthToUnmask = async () => {
    if (isMasked) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to view amounts",
        fallbackLabel: "Enter password",
      });

      if (result.success) {
        setIsMasked(false);
      } else {
        showToast({
          message: "Authentication failed: Unable to verify identity.",
          type: "error",
          duration: 3000,
        });
      }
    } else {
      setIsMasked(true);
    }
  };
  return (
    <YStack
      marginHorizontal="$2"
      p="$5"
      gap="$4"
      elevation={6}
      bg="$background"
      borderRadius="$4"
    >
      <XStack jc="space-between" ai="center">
        <Text fontSize={24} fontWeight="bold">
          Recent Transactions
        </Text>
        <Button
          onPress={handleBiometricAuthToUnmask}
          mt="$4"
          icon={isMasked ? EyeOff : Eye}
        />
        <Button
          mt="$4"
          onPress={() => logout({ navigate: router.replace })}
          icon={LogOut}
        />
      </XStack>
    </YStack>
  );
};
