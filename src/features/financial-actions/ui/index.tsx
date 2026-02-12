import { Button } from "@/shared/ui/button";
import Container from "@/shared/ui/custom/container";
import { financialActions } from "../model/constants";

export const FinancialActions = () => {
  return (
    <>
      <div className={`fixed right-0 bottom-0 left-0 z-20 mb-2`}>
        <Container>
          <ul className="glass-bg relative z-20 flex items-center justify-between gap-1 rounded-full p-1">
            {financialActions.map((item) => (
              <li key={item.label} className="flex-1">
                <Button
                  size="lg"
                  className="flex w-full items-center justify-center rounded-full"
                >
                  <item.icon />
                  {item.label}
                </Button>
              </li>
            ))}
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
