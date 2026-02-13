import { useQuery } from "@tanstack/react-query";
import { getDeposits } from "./client";

export const useDeposits = (investorId: string) => {
  return useQuery({
    queryKey: ["deposits", investorId],
    queryFn: () => getDeposits(investorId),
    enabled: Boolean(investorId),
  });
};
