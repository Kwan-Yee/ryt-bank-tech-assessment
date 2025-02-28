export type TShowToast = {
  showToast: ({
    message,
    type,
    duration,
  }: {
    message: string;
    type: "info" | "success" | "error";
    duration: number;
  }) => void;
};
