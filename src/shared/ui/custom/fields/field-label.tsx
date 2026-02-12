import { FieldLabel } from "../../field";

type FieldLabelProperties = {
  content: string;
  required?: boolean;
};

const Label: React.FC<FieldLabelProperties> = ({
  content,
  required = true,
}) => {
  return (
    <FieldLabel>
      {content} {required && <span className="text-destructive">*</span>}
    </FieldLabel>
  );
};

export default Label;
