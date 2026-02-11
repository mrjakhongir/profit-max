import { AddInvestor } from "@/features/add-investor";
import { Header } from "@/widgets/header";

const AddInvestorPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="Add Investor" hasBackButton />
      <AddInvestor />
    </div>
  );
};

export default AddInvestorPage;
