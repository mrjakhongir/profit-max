import { Button } from "@/shared/ui/button";
import { useQueryState } from "nuqs";
import type { TabItem } from "../model/types";

type Properties = {
  items: TabItem[];
};

export const Tabs: React.FC<Properties> = ({ items }) => {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "active",
  });

  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <Button
          key={item.value}
          className={`flex-1 rounded-full tracking-wider transition-all duration-400`}
          variant={status === item.value ? "default" : "secondary"}
          onClick={() => setStatus(item.value)}
        >
          {<item.icon />} {item.label}
        </Button>
      ))}
    </div>
  );
};
