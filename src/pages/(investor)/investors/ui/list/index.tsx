import { useInvestors } from "@/entities/investor/api/query";
import Container from "@/shared/ui/custom/container";
import EmptyState from "@/shared/ui/custom/empty-state";
import LoaderCenter from "@/shared/ui/custom/loader";
import { useQueryState } from "nuqs";
import ListItem from "./item";

const List = () => {
  const [status] = useQueryState("status", { defaultValue: "active" });

  const { data, isLoading, error } = useInvestors(status);

  if (isLoading) return <LoaderCenter />;
  if (data?.length === 0 && !error && !isLoading) return <EmptyState />;

  return (
    <Container className="z-20">
      <ul>
        {data?.map((investor) => (
          <ListItem key={investor.id} item={investor} />
        ))}
      </ul>
    </Container>
  );
};

export default List;
