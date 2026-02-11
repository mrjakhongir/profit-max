import { FinancialActions } from "@/features/financial-actions";
import { Balance } from "@/widgets/balance";
import { Header } from "@/widgets/header";

const InvestorDetailsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="John Doe" />

      <Balance />

      <FinancialActions />
    </div>
  );
};

export default InvestorDetailsPage;
