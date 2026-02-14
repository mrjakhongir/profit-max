import { useQuery } from "@tanstack/react-query";
import { getInvestorBalance, getInvestors } from "./client";

export const useInvestors = (status: string) =>
  useQuery({
    queryKey: ["investors", status],
    queryFn: () => getInvestors(status === "active"),
  });

export const useInvestorBalance = (investorId?: string) =>
  useQuery({
    queryKey: ["investor-balance", investorId],
    queryFn: () => getInvestorBalance(investorId!),
    enabled: Boolean(investorId),
  });
