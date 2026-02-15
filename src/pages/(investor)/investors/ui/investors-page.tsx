import { Header } from "@/widgets/header";
import { Tabs } from "@/widgets/tabs";
import { tabs } from "../model/constants";
import AddInvestorButton from "./add-investor-button";
import List from "./list";

const InvestorsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <img
        src="/ellipse.png"
        alt="ellipsis"
        className="absolute top-0 right-0"
      />

      <Header title="Investors" />
      <Tabs items={tabs} paramKey="status" defaultValue="active" />
      <List />
      <AddInvestorButton />
    </div>
  );
};

export default InvestorsPage;
