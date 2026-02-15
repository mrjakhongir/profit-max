import type { Transaction } from "@/pages/(investor)/details/model/types";
import RectangleGlass from "@/shared/ui/custom/rectangle-glass";
import { CalendarCheck2 } from "lucide-react";

type Properties = {
  item: Transaction;
};

const DepositDetailsItem: React.FC<Properties> = ({ item }) => {
  return (
    <li>
      <RectangleGlass>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-accent font-serif text-2xl font-medium">
            ${item.amount}
          </h3>
          <div className="text-muted-foreground/70 flex items-center gap-1">
            <CalendarCheck2 size={14} strokeWidth={2.3} />
            <span className="text-sm">{item.date}</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img src={item.image} alt="deposit check" />
        </div>
      </RectangleGlass>
    </li>
  );
};

export default DepositDetailsItem;
