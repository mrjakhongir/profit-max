import type { AddInvestorValues } from "@/features/add-investor/model/schema";
import { cn } from "@/shared/lib/utilities";
import { type LucideIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group";

type Properties = {
  form: UseFormReturn<AddInvestorValues>;
  label: string;
  name: keyof AddInvestorValues;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
};

const FormFieldGroup: React.FC<Properties> = (properties) => {
  const {
    form,
    label,
    name,
    type,
    placeholder,
    icon: Icon,
    required = true,
  } = properties;

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Field data-invalid={!!errors[name]} className="">
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </FieldLabel>

      <InputGroup className="bg-white">
        <InputGroupInput
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          aria-invalid={errors[name] ? "true" : "false"}
          aria-describedby={errors[name] ? `${name}-error` : ""}
          autoComplete="off"
        />

        {Icon && (
          <InputGroupAddon align="inline-end">{<Icon />}</InputGroupAddon>
        )}
      </InputGroup>

      <FieldDescription
        id={`${name}-error`}
        className={cn("text-xs", errors[name] ? "visible" : "invisible")}
      >
        {errors?.[name]?.message}
      </FieldDescription>
    </Field>
  );
};

export default FormFieldGroup;
