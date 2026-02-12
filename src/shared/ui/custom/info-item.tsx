import type { LucideIcon } from "lucide-react";

type Properties = {
  label: string | LucideIcon;
  value?: string | number;
};

const InfoItem: React.FC<Properties> = ({ label, value }) => {
  const Label = label;
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">
        {typeof Label === "string" ? Label : <Label className="h-4 w-4" />}
      </span>
      <span className="via-muted-foreground mx-1 mb-1 h-0.5 flex-1 self-end bg-linear-to-r from-transparent to-transparent bg-size-[8px_1px] bg-repeat-x"></span>
      <span className="text-muted-foreground flex max-w-[320px] min-w-0 flex-wrap items-center gap-1 text-end leading-[120%] font-medium break-all whitespace-normal">
        {value}
      </span>
    </li>
  );
};

export default InfoItem;
