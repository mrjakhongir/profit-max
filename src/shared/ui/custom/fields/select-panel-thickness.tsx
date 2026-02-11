import { useFeature } from "@/shared/hooks/use-feature";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Loader2 } from "lucide-react";
import { Controller } from "react-hook-form";
import { Field, FieldGroup } from "../../field";
import Label from "./field-label";

const SelectPanelThickness: React.FC<unknown> = ({ control }) => {
  const { data: panelThickness, loading } = useFeature("panel_thickness");
  return (
    <FieldGroup>
      <div className="flex gap-4">
        <Label content="Толщина панели:" />

        <Field className="w-1/2">
          <Controller
            control={control}
            name="panelThickness"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-lg">
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <SelectValue placeholder="Выберите толщину" />
                  )}
                </SelectTrigger>

                <SelectContent position="item-aligned">
                  <SelectGroup>
                    {panelThickness.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-lg"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>
    </FieldGroup>
  );
};

export default SelectPanelThickness;
