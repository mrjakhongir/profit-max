import { Header } from "@/widgets/header";
import DashboardBalance from "./balance";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="Home" />

      <DashboardBalance />
    </div>
  );
};

export default HomePage;
