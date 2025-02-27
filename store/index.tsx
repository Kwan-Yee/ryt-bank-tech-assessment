import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { ITransactionStore } from "./types";
import { handleFetchTransactionHistory } from "./reducers/handle-fetch-transactions-history";
import { handleFetchTransactionItem } from "./reducers/handle-fetch-transaction-item";

export const useTransactionStore = create<ITransactionStore>()(
  immer((set, get) => ({
    // auth slice
    isAuth: false,
    setAuth: (value) => {
      set((s) => {
        s.isAuth = value;
      });
    },

    // transaction slice
    transactionHistoryData: [],
    selectedTransactionItem: null,
    isFetchingTransactionHistory: false,
    isFetchingTransactionItem: false,
    fetchTransactionHistory: async () => handleFetchTransactionHistory(set),
    fetchTransactionItem: async ({ id }) =>
      handleFetchTransactionItem({ id, set }),
  }))
);
