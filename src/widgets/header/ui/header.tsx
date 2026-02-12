import Container from "@/shared/ui/custom/container";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

type Properties = {
  title: string;
  hasBackButton?: boolean;
};

export const Header: React.FC<Properties> = ({
  title,
  hasBackButton = false,
}) => {
  return (
    <div className="sticky top-0 z-30 border-b bg-white">
      <Container className="flex items-center py-3">
        {hasBackButton && (
          <Link to=".." relative="path" className="rounded-md px-1 py-0.5">
            <ChevronLeft />
          </Link>
        )}

        <h1 className="text-primary flex-1 text-center font-mono text-xl font-semibold">
          {title}
        </h1>
      </Container>
    </div>
  );
};
