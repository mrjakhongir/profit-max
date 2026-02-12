import { FolderOpenDot } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-muted-foreground/30 mx-auto mt-20 flex flex-col items-center">
      <FolderOpenDot size={80} strokeWidth={1} />
      <p className="text-center text-2xl">No data found!</p>
    </div>
  );
};

export default EmptyState;
