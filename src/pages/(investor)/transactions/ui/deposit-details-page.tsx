import { Header } from "@/widgets/header";
import { Tabs } from "@/widgets/tabs";
import { BanknoteArrowUp, HandCoins } from "lucide-react";

const tabs = [
  { label: "Dividends", value: "dividends", icon: HandCoins },
  { label: "Withdraw", value: "withdraw", icon: BanknoteArrowUp },
];

const DepositDetailsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="Deposit" hasBackButton />
      <Tabs items={tabs} paramKey="tab" defaultValue="dividends" />
    </div>
  );
};

export default DepositDetailsPage;
