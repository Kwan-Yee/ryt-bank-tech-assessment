import { ITransactionItem } from "@/store/types";
import { ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Card, XStack, YStack, Text } from "tamagui";

export const renderItem = ({
  item,
  isMasked,
}: {
  item: ITransactionItem;
  isMasked: boolean;
}) => (
  <Card
    mb="$2"
    p="$4"
    bg="$background"
    onPress={() => router.push(`/transaction/${item.id}`)}
  >
    <XStack gap="$4" ai="center">
      <Text>XX</Text>
      <YStack f={1}>
        <Text fontWeight="bold" color="$color" fontSize={16}>
          {item.merchant}
        </Text>
        <Text color="$color" o={0.6} fontSize={14}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
      </YStack>
      <YStack ai="flex-end">
        <Text
          fontWeight="bold"
          fontSize={16}
          color={item.amount < 0 ? "$red10" : "$green10"}
        >
          {isMasked
            ? "*****"
            : item.amount < 0
            ? `-${Math.abs(item.amount).toFixed(2)}`
            : `+${Math.abs(item.amount).toFixed(2)}`}
          $
        </Text>
        <XStack ai="center" o={0.6}>
          <Text fontSize={12} mr="$1">
            {item.category}
          </Text>
          <ChevronRight size={12} />
        </XStack>
      </YStack>
    </XStack>
  </Card>
);
