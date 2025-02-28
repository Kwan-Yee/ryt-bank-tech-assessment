import { mockHistory } from "../mockHistory";
import { ITransactionItem, ITransactionStore } from "../types";

export const handleFetchTransactionHistory = async (
  set: (fn: (state: ITransactionStore) => void) => void
): Promise<void> => {
  // start
  set((s) => {
    s.isFetchingTransactionHistory = true;
  });

  // mock fetch
  try {
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
