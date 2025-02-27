import { Href } from "expo-router";
import { NavigationOptions } from "expo-router/build/global-state/routing";
import { ITransactionStore } from "../types";

export const handleLogout = ({
  set,
  navigate,
}: {
  set: (fn: (state: ITransactionStore) => void) => void;
  navigate: (href: Href, options?: NavigationOptions) => void;
}) => {
  set((s) => {
    s.hasAuth = false;
  });
  navigate("/");
};
