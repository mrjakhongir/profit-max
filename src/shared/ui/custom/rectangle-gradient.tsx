import { cn } from "@/shared/lib/utilities";

type properties = {
  children: React.ReactNode;
  className?: string;
};

const RectangleGradient: React.FC<properties> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-primary relative z-30 overflow-hidden rounded-2xl p-4",
        className,
      )}
    >
      {children}
      <img
        src="/ellipse-full.png"
        alt="ellipsis"
        className="absolute top-0 right-0 z-0 h-full"
      />
    </div>
  );
};

export default RectangleGradient;
