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
  isAuth: boolean;
  setAuth: (value: boolean) => void;

  // transactions
  transactionHistoryData: ITransactionItem[] | null;
  selectedTransactionItem: ITransactionItem | null;
  isFetchingTransactionHistory: boolean;
  isFetchingTransactionItem: boolean;
  fetchTransactionHistory: () => Promise<void>;
  fetchTransactionItem: ({ id }: { id: string }) => Promise<void>;
}
