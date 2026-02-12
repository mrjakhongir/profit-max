"use client";

import { CreditCard } from "lucide-react";
import { forwardRef, useId } from "react";
import { withMask } from "use-mask-input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group";

type Properties = {
  value?: string;
  onChange?: (value: string) => void;
};

const CardNumberInput = forwardRef<HTMLInputElement, Properties>(
  ({ value, onChange }, reference) => {
    const id = useId();

    return (
      <div className="w-full">
        <InputGroup className="bg-white">
          <InputGroupInput
            id={id}
            type="text"
            placeholder="0000 0000 0000 0000"
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            ref={(element) => {
              withMask("9999 9999 9999 9999", {
                placeholder: "•",
                showMaskOnHover: false,
              })(element);

              if (typeof reference === "function") reference(element);
              else if (reference) reference.current = element;
            }}
            autoComplete="off"
          />

          <InputGroupAddon align="inline-end">
            <CreditCard />
          </InputGroupAddon>
        </InputGroup>
      </div>
    );
  },
);

CardNumberInput.displayName = "CardNumberInput";

export default CardNumberInput;
