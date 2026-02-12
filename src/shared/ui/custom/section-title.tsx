import { cn } from "@/shared/lib/utilities";

type Properties = {
  title: string;
  className?: string;
};

const SectionTitle: React.FC<Properties> = ({ title, className }) => {
  return (
    <h2
      className={cn("text-primary font-mono text-xl font-semibold", className)}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
