import { Header } from "@/widgets/header";
import DepositDetails from "./list";

const DepositDetailsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="Transactions" hasBackButton />

      <DepositDetails />
    </div>
  );
};

export default DepositDetailsPage;
