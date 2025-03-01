import { TShowToast } from "@/context/types";
import { mockHistory } from "../mockHistory";
import { ITransactionItem, ITransactionStore } from "../types";

export const handleFetchTransactionItem = async ({
  id,
  set,
}: {
  id: string;
  set: (fn: (state: ITransactionStore) => void) => void;
  showToast: TShowToast["showToast"];
}): Promise<void> => {
  // start
  set((s) => {
    s.isFetchingTransactionItem = true;
  });

  // mock fetch
  try {
    const data: ITransactionItem | null = await new Promise((res) =>
      setTimeout(
        () => res([...mockHistory].filter((item) => item.id === id)[0]),
        200
      )
    );
    set((s) => {
      s.isFetchingTransactionItem = false;
      s.selectedTransactionItem = data;
    });
  } catch (e) {
    set((s) => {
      s.isFetchingTransactionItem = false;
    });
  }
};
