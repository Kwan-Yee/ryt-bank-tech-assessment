import { ITransactionItem } from "@/store/types";
import { nanoid } from "nanoid/non-secure";

export const generateTransactionItems = (): ITransactionItem => {
  const newTransactionItem: ITransactionItem = {
    id: nanoid(),
    merchant: "Random Merchant",
    amount: Math.random() * 28.75,
    date: new Date().getTime(),
    category: "food",
    paymentMethod: "Credit Card",
    notes: "lorem",
  };

  return newTransactionItem;
};
