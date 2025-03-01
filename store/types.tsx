import { TShowToast } from "@/context/types";
import { Href } from "expo-router";
import { NavigationOptions } from "expo-router/build/global-state/routing";

export interface ITransactionItem {
  id: string;
  merchant: string;
  amount: number;
  date: number;
  category: string;
  paymentMethod: string;
  notes: string;
}

export interface ITransactionStore {
  // auth
  hasAuth: boolean;
  isAuthenticating: boolean;
  setIsAuthenticating: (value: boolean) => void;
  setAuth: (value: boolean) => void;
  logout: ({
    navigate,
  }: {
    navigate: (href: Href, options?: NavigationOptions) => void;
  }) => void;

  // transactions
  transactionHistoryData: ITransactionItem[] | null;
  selectedTransactionItem: ITransactionItem | null;
  isRefreshingTransactionHistory: boolean;
  isFetchingTransactionHistory: boolean;
  isFetchingTransactionItem: boolean;
  refreshTransactionHistory: ({
    showToast,
  }: {
    showToast: TShowToast["showToast"];
  }) => Promise<void>;
  fetchTransactionHistory: ({
    showToast,
  }: {
    showToast: TShowToast["showToast"];
  }) => Promise<void>;
  fetchTransactionItem: ({
    id,
    showToast,
  }: {
    id: string;
    showToast: TShowToast["showToast"];
  }) => Promise<void>;
}
