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

//TODO: do better in styling, right now it's all inline
export default function TransactionsScreen() {
  const router = useRouter();
  const {
    fetchTransactionHistory,
    transactionHistoryData,
    isFetchingTransactionHistory,
  } = useTransactionStore();
  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  const renderHeader = () => (
    <YStack p="$4" space="$4">
      <XStack jc="space-between" ai="center">
        <Text fontSize={24} fontWeight="bold">
          Recent Transactions
        </Text>
        <Button size="$3" chromeless onPress={() => {}} icon={LogOut} />
      </XStack>
      <Separator />
    </YStack>
  );

  const renderItem = ({ item }) => (
    <Card
      mb="$2"
      p="$4"
      bg="$background"
      onPress={() => router.push(`/transaction/${item.id}`)}
    >
      <XStack space="$4" ai="center">
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

  return (
    <YStack f={1} bg="$background">
      {isFetchingTransactionHistory ? (
        <YStack ai="center">
          <Spinner size="large" color="$blue10" />
          <Text mt="$2" color="$blue10">
            Loading...
          </Text>
        </YStack>
      ) : (
        <FlatList
          data={transactionHistoryData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          ListHeaderComponent={renderHeader}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
        />
      )}
    </YStack>
  );
}
