import { produce } from "immer";
import { ITransactionItem, ITransactionStore } from "../types";
import { generateTransactionItems } from "@/helpers/generate-new-transactions";

export const handleRefreshTransactionHistory = async (
  set: (fn: (state: ITransactionStore) => void) => void
) => {
  set((s) => {
    s.isRefreshingTransactionHistory = true;
  });

  //mock fetch, ideally with filters for queries on time elapsed since last fetch
  try {
    const refreshedData: ITransactionItem | null = await new Promise((res) =>
      setTimeout(() => res({ ...generateTransactionItems() }), 500)
    );
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
