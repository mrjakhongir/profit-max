import { FinancialActions } from "@/features/financial-actions";
import { Balance } from "@/widgets/balance";
import { Header } from "@/widgets/header";
import Investments from "./investments";

const InvestorDetailsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="John Doe" hasBackButton />
      <Balance />
      <Investments />
      <FinancialActions />
    </div>
  );
};

export default InvestorDetailsPage;
