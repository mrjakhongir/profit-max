import { CalendarCheck2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Investor } from "../../model/types";

type Properties = {
  item: Investor;
};

const ListItem: React.FC<Properties> = ({ item }) => {
  return (
    <li className="border-b py-2">
      <Link
        to={`/investors/${item.id}`}
        className="flex items-center justify-between gap-2"
      >
        <div className="flex flex-1 items-center justify-between gap-5">
          <div className="flex flex-col justify-around">
            <h3 className="font-mono font-semibold">{item.name}</h3>
            <div className="text-muted-foreground flex items-center gap-1 font-medium">
              <CalendarCheck2 size={16} />
              <span className="text-sm">{item.contract_date}</span>
            </div>
          </div>

          <p className="text-primary/10 font-serif text-4xl">${item.amount}</p>
        </div>
        <ChevronRight />
      </Link>
    </li>
  );
};

export default ListItem;
