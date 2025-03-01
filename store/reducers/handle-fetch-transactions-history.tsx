import { TShowToast } from "@/context/types";
import NetInfo from "@react-native-community/netinfo";
import { mockHistory } from "../mockHistory";
import { ITransactionItem, ITransactionStore } from "../types";

export const handleFetchTransactionHistory = async ({
  set,
  showToast,
}: {
  set: (fn: (state: ITransactionStore) => void) => void;
  showToast: TShowToast["showToast"];
}): Promise<void> => {
  // start
  set((s) => {
    s.isFetchingTransactionHistory = true;
  });

  // mock fetch
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

    const data: ITransactionItem[] | null = await new Promise((res) =>
      setTimeout(() => res([...mockHistory]), 500)
    );
    set((s) => {
      s.isFetchingTransactionHistory = false;
      s.transactionHistoryData = data;
    });
  } catch (e) {
    set((s) => {
      s.isFetchingTransactionHistory = false;
    });
  }
};
