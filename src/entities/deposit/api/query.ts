import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "./client";

export const useGetTransactionDetails = (depositId: string) => {
  return useQuery({
    queryKey: ["deposit-details", depositId],
    queryFn: () => getTransactionDetails(depositId),
    enabled: Boolean(depositId),
  });
};
