import Container from "@/shared/ui/custom/container";
import { Header } from "@/widgets/header";
import { Tabs } from "@/widgets/tabs";
import { tabs } from "./model/constants";

const InvestorsPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Header title="Investors" />

      <Container className="w-full">
        <Tabs items={tabs} />
      </Container>
    </div>
  );
};

export default InvestorsPage;
