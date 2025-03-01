import NetInfo from "@react-native-community/netinfo";
import { ITransactionItem, ITransactionStore } from "../types";
import { generateTransactionItems } from "@/helpers/generate-new-transactions";
import { TShowToast } from "@/context/types";

export const handleRefreshTransactionHistory = async ({
  set,
  showToast,
}: {
  set: (fn: (state: ITransactionStore) => void) => void;
  showToast: TShowToast["showToast"];
}) => {
  set((s) => {
    s.isRefreshingTransactionHistory = true;
  });

  // mock fetch, ideally with filters for queries on time elapsed since last fetch
  // if there is an api client, should can use the network checking in the api client itself
  try {
    // Check network state before making the call
    const networkState = await NetInfo.fetch();
    if (!networkState.isConnected) {
      showToast({
        message: "No internet connection",
        type: "error",
        duration: 3000,
      });
      throw new Error("No internet connection");
    }
    const refreshedData: ITransactionItem | null = await new Promise((res) => {
      // Check if error is network-related
      setTimeout(() => res({ ...generateTransactionItems() }), 500);
    });
    set((s) => ({
      isRefreshingTransactionHistory: false,
      transactionHistoryData:
        refreshedData && s.transactionHistoryData?.length
          ? [refreshedData, ...s.transactionHistoryData]
          : s.transactionHistoryData,
    }));
  } catch (error: any) {
    set((s) => {
      s.isRefreshingTransactionHistory = false;
    });
  }
};
