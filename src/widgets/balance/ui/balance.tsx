import Container from "@/shared/ui/custom/container";

export const Balance = () => {
  return (
    <div className="relative">
      <Container>
        <div className="glass-bg border-accent/10 relative z-20 rounded-3xl border">
          <div className="rounded-3xl bg-[url('../../../../public/bg-gradient.png')] bg-cover bg-no-repeat p-5">
            <p className="text-secondary text-md mb-3">Total balance</p>
            <h2 className="text-background font-mono text-3xl font-semibold">
              $16,500.80
            </h2>
          </div>

          <div className="flex px-5 py-3">
            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-semibold">
                Invested
              </p>
              <h3 className="text-primary font-medium">$10,000.00</h3>
            </div>

            <div className="flex-1">
              <p className="text-muted-foreground text-sm font-semibold">
                Earned
              </p>
              <h3 className="text-primary font-medium">$1,200.00</h3>
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
