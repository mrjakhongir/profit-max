import { cn } from "@/shared/lib/utilities";
import { FolderOpenDot } from "lucide-react";

type Properties = {
  className?: string;
  size?: number;
};

const EmptyState: React.FC<Properties> = ({ className, size = 80 }) => {
  return (
    <div
      className={cn(
        "text-muted-foreground/30 mx-auto mt-20 flex flex-col items-center text-2xl",
        className,
      )}
    >
      <FolderOpenDot size={size} strokeWidth={1} />
      <p className="text-center">No data found!</p>
    </div>
  );
};

export default EmptyState;
