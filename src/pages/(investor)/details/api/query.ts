import { useQuery } from "@tanstack/react-query";
import { getDepositHistory, getDeposits, getInvestorBalance } from "./client";

export const useDeposits = (investorId: string) => {
  return useQuery({
    queryKey: ["deposits", investorId],
    queryFn: () => getDeposits(investorId),
    enabled: Boolean(investorId),
  });
};

export const useDepositHistory = (depositId?: string) => {
  return useQuery({
    queryKey: ["deposit-history", depositId],
    queryFn: () => getDepositHistory(depositId!),
    enabled: Boolean(depositId),
  });
};

export const useInvestorBalance = (investorId?: string) =>
  useQuery({
    queryKey: ["investor-balance", investorId],
    queryFn: () => getInvestorBalance(investorId!),
    enabled: Boolean(investorId),
  });
