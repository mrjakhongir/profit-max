import { cn } from "@/shared/lib/utils";
type Props = {
  children: React.ReactNode;
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div className={cn("mx-auto max-w-340 px-5", className)}>{children}</div>
  );
};

export default Container;
