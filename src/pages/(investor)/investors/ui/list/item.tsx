import { CalendarCheck2, ChevronRight } from "lucide-react";

type Properties = {
  onClick: () => void;
};

const ListItem: React.FC<Properties> = ({ onClick }) => {
  return (
    <li
      className="flex items-center justify-between gap-2 border-b py-2"
      onClick={onClick}
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
      </div>
      <ChevronRight />
    </li>
  );
};

export default ListItem;
