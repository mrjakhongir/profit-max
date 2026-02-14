import { FinancialActions } from "@/pages/(investor)/details/ui/financial-actions";
import LoaderCenter from "@/shared/ui/custom/loader";
import { Header } from "@/widgets/header";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getInvestorById } from "../api/client";
import { Balance } from "./balance";
import Investments from "./investments";

const InvestorDetailsPage = () => {
  const { id: investorId } = useParams();

  const {
    data: investor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["investors", investorId],
    queryFn: () => getInvestorById(investorId || ""),
    enabled: !!investorId,
  });

  if (isLoading) return <LoaderCenter />;

  if (error) {
    toast.error(error.message);
    return;
  }

  return (
    <div className="flex flex-col gap-4 pb-25">
      <Header title={investor?.name} hasBackButton />
      <Balance />
      <Investments />
      <FinancialActions />
    </div>
  );
};

export default InvestorDetailsPage;
