import { cn } from "@/shared/lib/utilities";
import { type LucideIcon } from "lucide-react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Field, FieldDescription, FieldLabel } from "../../field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../input-group";

type Properties<T extends FieldValues> = {
  form: UseFormReturn<T>;
  label: string;
  name: Path<T>;
  type: string;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
};

const FormFieldGroup = <T extends FieldValues>(properties: Properties<T>) => {
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
    <Field data-invalid={!!errors[name]} className="gap-1">
      <FieldLabel htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </FieldLabel>

      <InputGroup className="bg-white">
        <InputGroupInput
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { valueAsNumber: type === "number" })}
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
        {errors?.[name]?.message as string}
      </FieldDescription>
    </Field>
  );
};

export default FormFieldGroup;
