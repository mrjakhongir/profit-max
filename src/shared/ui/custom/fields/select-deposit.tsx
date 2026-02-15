import { useDeposits } from "@/pages/(investor)/details/api/query";
import type { Deposit } from "@/pages/(investor)/details/model/types";
import { formatNumber } from "@/shared/lib/format-number";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

type Properties = {
  value: string;
  onChange: (deposit: Deposit) => void;
  investorId?: string;
};

const SelectDeposit: React.FC<Properties> = ({
  value,
  onChange,
  investorId,
}) => {
  const { data: deposits, isLoading, error } = useDeposits(investorId || "");

  useEffect(() => {
    if (error) {
      toast.error("Error fetching deposits");
      console.error(error);
    }
  }, [error]);

  return (
    <Select
      value={value || ""}
      onValueChange={(depositId) => {
        const deposit = deposits?.find((d) => d.id === depositId);
        if (deposit) {
          onChange(deposit);
        }
      }}
    >
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
              <span className="tracking-wide">
                ${formatNumber(deposit.amount)}
              </span>{" "}
              /<span className="text-muted-foreground">{deposit.date}</span>/
              <span className="text-muted-foreground">
                {deposit.interest_rate}%
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectDeposit;
