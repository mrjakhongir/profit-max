import Container from "@/shared/ui/custom/container";
import RectangleGradient from "@/shared/ui/custom/rectangle-gradient";

export const Balance = () => {
  return (
    <div className="relative">
      <Container>
        <div className="glass-bg border-accent/10 relative z-20 overflow-hidden rounded-2xl border">
          <RectangleGradient>
            <p className="text-secondary text-md mb-3">Total balance</p>
            <h2 className="text-background font-mono text-3xl font-semibold">
              $34,800.00
            </h2>
          </RectangleGradient>

          <div className="flex px-4 py-3">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-semibold">
                Invested
              </p>
              <h3 className="text-primary font-medium">$30,000.00</h3>
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-semibold">
                Earned
              </p>
              <h3 className="text-primary font-medium">$4,800.00</h3>
            </div>
          </div>
        </div>
      </Container>

      <img
        src="/mask-left.png"
        alt="mask"
        className="absolute top-1/4 left-0 z-0"
      />
    </div>
  );
};
