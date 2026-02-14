import { Header } from "@/widgets/header";
import { Outlet } from "react-router-dom";

const DepositLayout = () => {
  return (
    <div>
      <Header title="Deposit" />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DepositLayout;
