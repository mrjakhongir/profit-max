import { CalendarCheck2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const ListItem = () => {
  return (
    <li className="border-b py-2">
      <Link
        to="/investors/1"
        className="flex items-center justify-between gap-2"
      >
        <div className="flex gap-2">
          <div className="overflow-hidden rounded-md">
            <img src="https://picsum.photos/50/50" alt="avatar" />
          </div>

          <div className="flex flex-col justify-around">
            <h3 className="font-mono font-semibold">John Doe</h3>
            <div className="text-muted-foreground flex items-center gap-1 font-medium">
              <CalendarCheck2 size={16} />
              <span className="text-sm">21.10.2025</span>
            </div>
          </div>
        </div>{" "}
        <ChevronRight />
      </Link>
    </li>
  );
};

export default ListItem;
