import { useAuth } from "@/features/auth/hooks/use-auth";
import { queryClient } from "@/shared/config/query-client";
import { uploadImage } from "@/shared/lib/upload-image";
import { cn } from "@/shared/lib/utilities";
import { Button } from "@/shared/ui/button";
import DatePicker from "@/shared/ui/custom/date-picker";
import Label from "@/shared/ui/custom/fields/field-label";
import FormFieldGroup from "@/shared/ui/custom/fields/form-field-group";
import { ImageUploader } from "@/shared/ui/custom/fields/input-image";
import SelectDeposit from "@/shared/ui/custom/fields/select-deposit";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Field, FieldDescription, FieldGroup } from "@/shared/ui/field";
import { supabaseClient } from "@/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandCoins, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { defaultValues } from "../model/constants";
import { spottingSchema, type SpottingFormValues } from "../model/schema";

export const Spotting = () => {
  const { id: investorId } = useParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<SpottingFormValues>({
    resolver: zodResolver(spottingSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const makeSpotting = async (values: SpottingFormValues) => {
    if (!investorId || !user) return;

    // Upload image and get url
    let imageUrl: string = "";
    if (values.image) {
      try {
        const upload = await uploadImage(
          user.id,
          values.image,
          "dividend-checks",
        );
        imageUrl = upload.publicUrl;
      } catch {
        toast.error("Image upload failed");
        return;
      }
    }

    const payload = {
      ...values,
      investor_id: investorId,
      user_id: user.id,
      image: imageUrl,
    };

    // Create withdrawal record
    const { error } = await supabaseClient
      .from("dividends")
      .insert([payload])
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    // Success
    queryClient.invalidateQueries({ queryKey: ["deposits"] });
    toast.success("Withdrawal created");
    setOpen(false);
    // reset();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-accent flex h-16 w-16 items-center justify-center rounded-full">
          <HandCoins />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dividend</DialogTitle>
          <DialogDescription>Alhamdulillah, new dividend 🎉</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(makeSpotting)}>
          <FieldGroup className="gap-3">
            <Field data-invalid={!!errors.deposit_id} className="gap-1">
              <Label content="Deposit" />

              <Controller
                name="deposit_id"
                control={control}
                render={({ field }) => (
                  <SelectDeposit
                    investorId={investorId}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <FieldDescription
                id="deposit_id-error"
                className={cn(
                  "text-xs",
                  errors.deposit_id ? "visible" : "invisible",
                )}
              >
                {errors?.deposit_id?.message}
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.date} className="gap-1">
              <Label content="Spotting date" />

              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />

              <FieldDescription
                id="date-error"
                className={cn("text-xs", errors.date ? "visible" : "invisible")}
              >
                {errors?.date?.message}
              </FieldDescription>
            </Field>

            <FormFieldGroup<SpottingFormValues>
              form={form}
              label="Spotting amount"
              name="amount"
              type="number"
              placeholder="amount"
              icon={HandCoins}
            />

            <Field data-invalid={!!errors.image} className="gap-1">
              <Label content="Check image" />

              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <FieldDescription
                id="image-error"
                className={cn(
                  "text-xs",
                  errors.image ? "visible" : "invisible",
                )}
              >
                {errors?.image?.message}
              </FieldDescription>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-5">
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="flex-1">
                  Close
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
