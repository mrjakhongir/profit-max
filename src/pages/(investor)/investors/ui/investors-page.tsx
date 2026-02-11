import { Header } from "@/widgets/header";
import { Tabs } from "@/widgets/tabs";
import { tabs } from "../model/constants";
import List from "./list";

const InvestorsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <>
        <img
          src="/mask-top.png"
          alt="mask"
          className="absolute top-0 right-0"
        />

        <img
          src="/ellipse.png"
          alt="ellipsis"
          className="absolute top-0 right-0"
        />
      </>

      <Header title="Investors" />

      <Tabs items={tabs} />

      <List />
    </div>
  );
};

export default InvestorsPage;
