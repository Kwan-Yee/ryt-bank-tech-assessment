import { useRouter } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { Text, YStack, Spinner, Button } from "tamagui";
import { useEffect } from "react";
import { useTransactionStore } from "@/store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { renderHeader } from "@/components/list-header";
import { renderItem } from "@/components/list-item";
import { Toast, useToastController } from "@tamagui/toast";
import { useCustomToast } from "@/context/toast";

//TODO: do better in styling, right now it's all inline
export default function TransactionsScreen() {
  const { showToast } = useCustomToast()!;
  const {
    fetchTransactionHistory,
    transactionHistoryData,
    isFetchingTransactionHistory,
    isRefreshingTransactionHistory,
    logout,
    refreshTransactionHistory,
  } = useTransactionStore();
  useEffect(() => {
    fetchTransactionHistory({ showToast });
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <YStack f={1} bg="$background" pt={insets.top}>
      {isFetchingTransactionHistory ? (
        <YStack f={1} ai="center" jc="center">
          <Spinner size="large" color="$gray8" />
          <Text mt="$2" color="$gray8">
            Loading...
          </Text>
        </YStack>
      ) : (
        <YStack f={1}>
          {renderHeader({ logout })}
          <FlatList
            data={transactionHistoryData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ padding: 16 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshingTransactionHistory}
                onRefresh={() => refreshTransactionHistory({ showToast })}
              />
            }
          />
        </YStack>
      )}
    </YStack>
  );
}
