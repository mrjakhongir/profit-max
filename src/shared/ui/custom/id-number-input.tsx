"use client";

import { IdCard } from "lucide-react";
import { forwardRef, useId } from "react";
import { withMask } from "use-mask-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group";

type Properties = {
  value?: string;
  onChange?: (value: string) => void;
};

const IDInputMask = forwardRef<HTMLInputElement, Properties>(
  ({ value, onChange }, reference) => {
    const id = useId();

    return (
      <div className="w-full">
        <InputGroup>
          <InputGroupInput
            id={id}
            type="text"
            placeholder="AA 1234567"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            ref={(element) => {
              withMask("AA 9999999", {
                placeholder: "•",
                showMaskOnHover: false,
              })(element);

              if (typeof reference === "function") reference(element);
              else if (reference) reference.current = element;
            }}
          />
          <InputGroupAddon align="inline-end">
            <IdCard />
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
);

IDInputMask.displayName = "IDInputMask";

export default IDInputMask;
