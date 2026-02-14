import { Accordion } from "@/shared/ui/accordion";
import EmptyState from "@/shared/ui/custom/empty-state";
import LoaderCenter from "@/shared/ui/custom/loader";
import { useParams } from "react-router-dom";
import { useDeposits } from "../../api/query";
import TransactionItem from "./item";

const TransactionsList = () => {
  const { id: investorId } = useParams();
  const { data: deposits, isLoading, error } = useDeposits(investorId || "");

  if (isLoading) return <LoaderCenter className="mt-5" />;

  if (deposits?.length === 0 && !error && !isLoading) {
    return <EmptyState />;
  }

  return (
    <ul className="flex flex-col">
      <Accordion type="multiple">
        {deposits?.map((deposit) => (
          <TransactionItem key={deposit.id} item={deposit} />
        ))}
      </Accordion>
    </ul>
  );
};

export default TransactionsList;
