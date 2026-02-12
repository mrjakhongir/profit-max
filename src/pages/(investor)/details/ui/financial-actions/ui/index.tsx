import { MakeDeposit } from "@/features/make-deposit";
import { MakeWithdrawal } from "@/features/make-withdrawal";
import { Spotting } from "@/features/spotting";
import Container from "@/shared/ui/custom/container";

export const FinancialActions = () => {
  return (
    <>
      <div className={`fixed right-0 bottom-0 left-0 z-20 mb-2`}>
        <Container>
          <ul className="glass-bg relative z-20 flex items-center gap-2 rounded-full p-1 px-2">
            <MakeDeposit />
            <Spotting />
            <MakeWithdrawal />
          </ul>
        </Container>
      </div>

      <img
        src="/mask-right.png"
        alt="mask"
        className="fixed right-0 bottom-0 z-0"
      />
    </>
  );
};
