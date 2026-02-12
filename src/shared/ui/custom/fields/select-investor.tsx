import { useAuth } from "@/features/auth/hooks/use-auth";
import { getInvestors } from "@/pages/(investor)/investors/api/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Properties = {
  value: string;
  onChange: (value: string) => void;
};

const SelectInvestor: React.FC<Properties> = ({ value, onChange }) => {
  const { user } = useAuth();

  const {
    data: investors,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["select-investors", user?.id],
    queryFn: () => getInvestors(user!.id),
    enabled: !!user,
  });

  if (error) {
    toast.error("Error fetching investors");
    console.error(error);
  }

  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="w-45">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <SelectValue placeholder="Select investor" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {investors?.map((investor) => (
            <SelectItem key={investor.id} value={investor.id}>
              {investor.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInvestor;
