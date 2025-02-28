import { ITransactionStore } from "@/store/types";
import { LogOut } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { YStack, XStack, Text, Button } from "tamagui";

export const renderHeader = ({
  logout,
}: {
  logout: ITransactionStore["logout"];
}) => (
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
        size="$3"
        chromeless
        onPress={() => logout({ navigate: router.replace })}
        icon={LogOut}
      />
    </XStack>
  </YStack>
);
