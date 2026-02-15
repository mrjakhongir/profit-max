import { useGetTransactionDetails } from "@/entities/deposit/api/query";
import { formatNumber } from "@/shared/lib/format-number";
import Container from "@/shared/ui/custom/container";
import EmptyState from "@/shared/ui/custom/empty-state";
import LoaderCenter from "@/shared/ui/custom/loader";
import RectangleGradient from "@/shared/ui/custom/rectangle-gradient";
import { Tabs } from "@/widgets/tabs";
import { BanknoteArrowUp, CalendarCheck2, HandCoins } from "lucide-react";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useParams } from "react-router-dom";
import DepositDetailsItem from "./item";

const tabs = [
  { label: "Dividends", value: "dividends", icon: HandCoins },
  { label: "Withdrawals", value: "withdrawals", icon: BanknoteArrowUp },
];

const DepositDetails = () => {
  const { depositId } = useParams();
  const tabParser = parseAsStringEnum(["dividends", "withdrawals"] as const);
  const [tab] = useQueryState("tab", tabParser.withDefault("dividends"));

  const { data, isLoading } = useGetTransactionDetails(depositId || "");

  if (isLoading) {
    return <LoaderCenter />;
  }

  if (!data) {
    return <EmptyState />;
  }

  const transactions = data[tab] || [];

  return (
    <main className="mb-20 flex flex-col gap-4">
      <Container>
        <RectangleGradient>
          <p className="text-secondary text-md mb-3">Deposit amount</p>
          <h2 className="text-background mb-1 font-mono text-3xl font-semibold">
            ${formatNumber(data.deposit.amount)}
          </h2>
          <div className="text-secondary flex items-center gap-1 text-sm">
            <CalendarCheck2 size={14} />
            {data.deposit.date}
          </div>
        </RectangleGradient>
      </Container>

      <Tabs items={tabs} paramKey="tab" defaultValue="dividends" />

      <Container>
        {transactions.length === 0 ? (
          <EmptyState className="mt-10 text-xl" size={60} />
        ) : (
          <ul className="flex flex-col gap-2">
            {transactions.map((item) => (
              <DepositDetailsItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
};

export default DepositDetails;
