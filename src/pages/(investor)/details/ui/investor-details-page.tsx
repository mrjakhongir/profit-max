import { useAuth } from "@/features/auth/hooks/use-auth";
import { FinancialActions } from "@/pages/(investor)/details/ui/financial-actions";
import LoaderCenter from "@/shared/ui/custom/loader";
import { Balance } from "@/widgets/balance";
import { Header } from "@/widgets/header";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getInvestorById } from "../api/client";
import Investments from "./investments";

const InvestorDetailsPage = () => {
  const { id: investorId } = useParams();
  const { user } = useAuth();

  const {
    data: investor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["investors", user?.id, investorId],
    queryFn: () => getInvestorById(user?.id || "", investorId || ""),
    enabled: !!user && !!investorId,
  });

  if (isLoading) return <LoaderCenter />;

  if (error) {
    toast.error(error.message);
    console.error(error);
    return;
  }

  return (
    <div className="mb-20 flex flex-col gap-4">
      <Header title={investor?.name} hasBackButton />
      <Balance />
      <Investments />
      <FinancialActions />
    </div>
  );
};

export default InvestorDetailsPage;
