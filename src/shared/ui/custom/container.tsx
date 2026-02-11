import { cn } from "@/shared/lib/utilities";
type Properties = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Properties> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto max-w-340 px-5", className)}>{children}</div>
  );
};

export default Container;
