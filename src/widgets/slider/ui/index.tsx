import { Button } from "@/shared/ui/button";
import type { SliderItem } from "../model/types";

type Properties = {
  items: SliderItem[];
  onClick: (item: SliderItem) => void;
  activeItem?: string;
};

export const Slider: React.FC<Properties> = ({
  items,
  onClick,
  activeItem,
}) => {
  return (
    <div className="glass-bg border-accent/10 overflow-auto rounded-lg border p-1">
      <div className="flex flex-nowrap gap-1.5">
        {items.map((item) => (
          <Button
            key={item.title}
            onClick={() => onClick(item)}
            className="rounded-sm"
            size="sm"
            variant={activeItem === item.title ? "default" : "ghost"}
          >
            {item.title}
          </Button>
        ))}
      </div>
    </div>
  );
};
