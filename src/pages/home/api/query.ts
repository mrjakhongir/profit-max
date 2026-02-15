import { useQuery } from "@tanstack/react-query";
import { getDashboardBalance } from "./client";

export const useGetDashboardBalance = () => {
  return useQuery({
    queryKey: ["getDashboardBalance"],
    queryFn: getDashboardBalance,
  });
};
