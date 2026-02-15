import { getInvestorById } from "@/entities/investor/api/client";
import Container from "@/shared/ui/custom/container";
import InfoItem from "@/shared/ui/custom/info-item";
import RectangleGlass from "@/shared/ui/custom/rectangle-glass";
import SectionTitle from "@/shared/ui/custom/section-title";
import { Skeleton } from "@/shared/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const InvestorInfo = () => {
  const { id: investorId } = useParams();

  const {
    data: investor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["investors-info", investorId],
    queryFn: () => getInvestorById(investorId || ""),
    enabled: !!investorId,
  });

  if (isLoading)
    return (
      <Container>
        <Skeleton className="bg-secondary h-61 rounded-2xl" />
      </Container>
    );

  if (error) {
    toast.error(error.message);
    return;
  }

  if (!investor) {
    toast.error("Investor not found");
    return;
  }

  return (
    <section className="relative z-20">
      <Container>
        <RectangleGlass className="flex flex-col gap-2">
          <SectionTitle title={investor.name} />
          <InfoItem label="ID:" value={investor.id_number} />
          <InfoItem label="Added:" value={investor.contract_date} />
          <InfoItem
            label="Interest rate:"
            value={`${investor.interest_rate}%`}
          />
          <InfoItem label="Card:" value={`${investor.card_number}`} />

          {investor.description && (
            <div className="text-muted-foreground flex items-start gap-2 rounded-lg border p-2 text-sm leading-none">
              <Info className="h-4 w-4" />
              <p>{investor.description}</p>
            </div>
          )}
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

export default InvestorInfo;
