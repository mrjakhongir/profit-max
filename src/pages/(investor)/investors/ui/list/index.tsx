import { useAuth } from "@/features/auth/hooks/use-auth";
import Container from "@/shared/ui/custom/container";
import EmptyState from "@/shared/ui/custom/empty-state";
import LoaderCenter from "@/shared/ui/custom/loader";
import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { getInvestors } from "../../api/client";
import ListItem from "./item";

const List = () => {
  const { user } = useAuth();
  const [status] = useQueryState("status", { defaultValue: "active" });

  const { data, isLoading, error } = useQuery({
    queryKey: ["investors", user?.id, status],
    queryFn: () => getInvestors(user!.id, status === "active"),
    enabled: !!user,
  });

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
