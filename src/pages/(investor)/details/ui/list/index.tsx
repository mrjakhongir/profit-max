import EmptyState from "@/shared/ui/custom/empty-state";
import LoaderCenter from "@/shared/ui/custom/loader";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDeposits } from "../../api/query";
import TransactionItem from "./item";

const TransactionsList = () => {
  const { id: investorId } = useParams();

  const { data: deposits, isLoading, error } = useDeposits(investorId || "");

  if (isLoading) return <LoaderCenter />;

  if (error) {
    toast.error(error.message);
    console.error(error);
    return <EmptyState />;
  }

  if (deposits?.length === 0 && !error && !isLoading) {
    return <EmptyState />;
  }

  return (
    <ul className="flex flex-col">
      {deposits?.map((deposit) => (
        <TransactionItem key={deposit.id} item={deposit} />
      ))}
    </ul>
  );
};

export default TransactionsList;
