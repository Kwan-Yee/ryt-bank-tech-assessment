import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { ITransactionStore } from "./types";
import { handleFetchTransactionHistory } from "./reducers/handle-fetch-transactions-history";
import { handleFetchTransactionItem } from "./reducers/handle-fetch-transaction-item";
import { handleLogout } from "./reducers/handle-logout";
import { handleRefreshTransactionHistory } from "./reducers/handle-refresh-transaction-history";
import { TShowToast } from "@/context/types";

export const useTransactionStore = create<ITransactionStore>()(
  immer((set) => ({
    // auth slice
    hasAuth: false,
    isAuthenticating: false,
    setAuth: (value) => {
      set((s) => {
        s.hasAuth = value;
      });
    },
    setIsAuthenticating: (value) => {
      set((s) => {
        s.isAuthenticating = value;
      });
    },
    logout: ({ navigate }) => handleLogout({ set, navigate }),

    // transaction slice
    transactionHistoryData: [],
    selectedTransactionItem: null,
    isRefreshingTransactionHistory: false,
    isFetchingTransactionHistory: false,
    isFetchingTransactionItem: false,
    fetchTransactionHistory: async ({ showToast }) =>
      handleFetchTransactionHistory({ set, showToast }),
    refreshTransactionHistory: async ({ showToast }) =>
      handleRefreshTransactionHistory({ set, showToast }),
    fetchTransactionItem: async ({ id, showToast }) =>
      handleFetchTransactionItem({ id, set, showToast }),
  }))
);
