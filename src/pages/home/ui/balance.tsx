import { formatNumber } from "@/shared/lib/format-number";
import Container from "@/shared/ui/custom/container";
import RectangleGradient from "@/shared/ui/custom/rectangle-gradient";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  HandCoins,
  Users,
} from "lucide-react";
import { useGetDashboardBalance } from "../api/query";

const DashboardBalance = () => {
  const { data, isLoading } = useGetDashboardBalance();

  if (isLoading) {
    return (
      <div className="relative">
        <Container className="relative z-50">
          <Skeleton className="glass-bg h-42.5 rounded-2xl" />
        </Container>
        <img
          src="/mask-left.png"
          alt="mask"
          className="absolute top-0 left-0 z-0"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Container>
        <div className="glass-bg border-accent/10 relative z-20 overflow-hidden rounded-2xl border">
          <RectangleGradient>
            <p className="text-secondary text-md mb-3">Total balance</p>
            <h2 className="text-background mb-2 font-mono text-3xl font-semibold">
              ${formatNumber(data?.total_balance)}
            </h2>
          </RectangleGradient>

          <div className="text-primary flex px-4 py-3 text-sm font-medium">
            <div className="flex-1">
              <BanknoteArrowDown />
              <h3 className="mt-1">${formatNumber(data?.total_deposits)}</h3>
            </div>

            <div className="flex-1">
              <HandCoins />
              <h3 className="mt-1">
                ${formatNumber(data?.total_dividends_paid)}
              </h3>
            </div>

            <div className="flex-1">
              <BanknoteArrowUp />
              <h3 className="mt-1">
                ${formatNumber(data?.dividends_due_this_month)}
              </h3>
            </div>

            <div>
              <Users />
              <h3 className="mt-1">{data?.investors_count}</h3>
            </div>
          </div>
        </div>
      </Container>

      <img
        src="/mask-left.png"
        alt="mask"
        className="absolute top-0 left-0 z-0"
      />
    </div>
  );
};

export default DashboardBalance;
