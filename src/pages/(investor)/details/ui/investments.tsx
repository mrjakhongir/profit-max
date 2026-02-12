import Container from "@/shared/ui/custom/container";
import RectangleGlass from "@/shared/ui/custom/rectangle-glass";
import SectionTitle from "@/shared/ui/custom/section-title";
import TransactionsList from "./list";

const Investments = () => {
  return (
    <section className="relative z-20">
      <Container>
        <RectangleGlass className="flex flex-col gap-2">
          <SectionTitle title="Investments & Earnings" />

          <TransactionsList />
        </RectangleGlass>
      </Container>

      <img
        src="/mask-center.png"
        alt="mask center"
        className="absolute top-1/2 left-1/2 z-0 -translate-1/2"
      />
    </section>
  );
};

export default Investments;
