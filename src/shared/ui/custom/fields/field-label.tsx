import { FieldLabel } from "../../field";

type FieldLabelProperties = {
  content: string;
};

const Label: React.FC<FieldLabelProperties> = ({ content }) => {
  return (
    <FieldLabel className="w-1/2 justify-end text-end text-lg">
      {content}
    </FieldLabel>
  );
};

export default Label;
