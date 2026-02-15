import { useInvestorBalance } from "@/entities/investor/api/query";
import { formatNumber } from "@/shared/lib/format-number";
import Container from "@/shared/ui/custom/container";
import RectangleGradient from "@/shared/ui/custom/rectangle-gradient";
import { Skeleton } from "@/shared/ui/skeleton";
import { useParams } from "react-router-dom";

export const Balance = () => {
  const { id: investorId } = useParams();

  const { data, isLoading } = useInvestorBalance(investorId || "");

  if (isLoading) {
    return (
      <Container>
        <Skeleton className="bg-secondary h-42.5 rounded-2xl" />
      </Container>
    );
  }

  return (
    <section className="relative">
      <Container>
        <div className="glass-bg border-accent/10 relative z-20 overflow-hidden rounded-2xl border">
          <RectangleGradient>
            <p className="text-secondary text-md mb-3">Total balance</p>
            <h2 className="text-background font-mono text-3xl font-semibold">
              ${formatNumber(data?.total_balance)}
            </h2>
          </RectangleGradient>

          <div className="flex px-4 py-3 text-sm font-medium">
            <div className="flex-1">
              <p className="text-muted-foreground/70">Invested</p>
              <h3 className="text-primary">
                ${formatNumber(data?.total_deposited)}
              </h3>
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground/70">Earned</p>
              <h3 className="text-primary">
                ${formatNumber(data?.total_dividends)}
              </h3>
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground/70">Withdrawn</p>
              <h3 className="text-primary">
                ${formatNumber(data?.total_withdrawn)}
              </h3>
            </div>
          </div>
        </div>
      </Container>

      <img
        src="/mask-left.png"
        alt="mask"
        className="absolute top-0 left-0 z-0"
      />
    </section>
  );
};
