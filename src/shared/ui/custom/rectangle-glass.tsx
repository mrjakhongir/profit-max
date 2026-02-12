import { cn } from "@/shared/lib/utilities";

type properties = {
  children: React.ReactNode;
  className?: string;
};

const RectangleGlass: React.FC<properties> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "glass-bg border-accent/10 relative z-30 overflow-hidden rounded-2xl border p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default RectangleGlass;
