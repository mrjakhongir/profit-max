import { paths } from "@/shared/routes";
import { Button } from "@/shared/ui/button";
import { UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

const AddInvestorButton = () => {
  return (
    <Link to={paths.investors.add}>
      <Button className="bg-accent fixed right-4 bottom-20 h-12 w-12 rounded-full shadow-lg">
        <UserRoundPlus />
      </Button>
    </Link>
  );
};

export default AddInvestorButton;
