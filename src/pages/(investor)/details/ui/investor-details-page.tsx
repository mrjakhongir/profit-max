import { FinancialActions } from "@/pages/(investor)/details/ui/financial-actions";
import { Header } from "@/widgets/header";
import { Balance } from "./balance";
import InvestorInfo from "./info/investor-info";
import Investments from "./investments";

const InvestorDetailsPage = () => {
  return (
    <div className="flex flex-col gap-4 pb-25">
      <Header title="Investor" hasBackButton />
      <Balance />
      <InvestorInfo />
      <Investments />
      <FinancialActions />
    </div>
  );
};

export default InvestorDetailsPage;
