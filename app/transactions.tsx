import { useRouter } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import {
  View,
  Text,
  YStack,
  XStack,
  Card,
  Separator,
  Avatar,
  Button,
  Spinner,
} from "tamagui";
import { ChevronRight, LogOut, TestTube } from "@tamagui/lucide-icons";
import { useEffect } from "react";
import { useTransactionStore } from "@/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ITransactionItem } from "@/store/types";
import { handleLogout } from "@/store/reducers/handle-logout";

//TODO: do better in styling, right now it's all inline
export default function TransactionsScreen() {
  const router = useRouter();
  const {
    fetchTransactionHistory,
    transactionHistoryData,
    isFetchingTransactionHistory,
    logout,
  } = useTransactionStore();
  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  const renderHeader = () => (
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
  const renderItem = ({ item }: { item: ITransactionItem }) => (
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
            {item.amount < 0 ? "-" : "+"}${Math.abs(item.amount).toFixed(2)}
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

  const insets = useSafeAreaInsets();

  return (
    <YStack f={1} bg="$background" pt={insets.top}>
      {isFetchingTransactionHistory ? (
        <YStack ai="center">
          <Spinner size="large" color="$gray8" />
          <Text mt="$2" color="$gray8">
            Loading...
          </Text>
        </YStack>
      ) : (
        <YStack f={1}>
          {renderHeader()}
          <FlatList
            data={transactionHistoryData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            stickyHeaderIndices={[0]}
            contentContainerStyle={{ padding: 16 }}
            // ListHeaderComponent={renderHeader}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          />
        </YStack>
      )}
    </YStack>
  );
}
