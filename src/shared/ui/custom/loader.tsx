import { cn } from "@/shared/lib/utilities";
import { Loader2 } from "lucide-react";

type Properties = {
  className?: string;
  size?: number;
};

const LoaderCenter: React.FC<Properties> = ({ className, size = 40 }) => {
  return (
    <Loader2
      className={cn("text-primary mx-auto mt-20 animate-spin", className)}
      size={size}
    />
  );
};

export default LoaderCenter;
