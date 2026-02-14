import { useDeposits } from "@/pages/(investor)/details/api/query";
import type { Deposit } from "@/pages/(investor)/details/model/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type Properties = {
  value: string;
  onChange: (value: string) => void;
  investorId?: string;
};

const SelectDeposit: React.FC<Properties> = ({
  value,
  onChange,
  investorId,
}) => {
  const { data: deposits, isLoading, error } = useDeposits(investorId || "");

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
          <SelectValue placeholder="Select deposit" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {deposits?.map((deposit: Deposit) => (
            <SelectItem key={deposit.id} value={deposit.id}>
              <span className="font-mono tracking-wide">${deposit.amount}</span>{" "}
              /<span className="text-muted-foreground">{deposit.date}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDeposit;
