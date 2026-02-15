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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Field, FieldDescription, FieldGroup } from "@/shared/ui/field";
import { supabaseClient } from "@/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { BanknoteArrowUp, Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { defaultValues } from "../model/constants";
import { withdrawalSchema, type WithdrawalFormValues } from "../model/schema";

export const MakeWithdrawal = () => {
  const { id: investorId } = useParams();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const makeWithdrawal = async (values: WithdrawalFormValues) => {
    if (!investorId || !user) return;

    // Upload image and get url
    let imageUrl: string = "";
    if (values.image) {
      try {
        const upload = await uploadImage(
          user.id,
          values.image,
          "withdrawal-checks",
        );
        imageUrl = upload.publicUrl;
      } catch {
        toast.error("Image upload failed");
        return;
      }
    }

    // Create withdrawal record
    const { error } = await supabaseClient.rpc(
      "create_withdrawal_transaction",
      {
        p_deposit_id: values.deposit_id,
        p_investor_id: investorId,
        p_amount: values.amount,
        p_date: values.date,
        p_image: imageUrl,
      },
    );

    if (error) {
      toast.error(error.message);
      return;
    }

    // Success
    queryClient.invalidateQueries({ queryKey: ["deposits"] });
    queryClient.invalidateQueries({ queryKey: ["investor-balance"] });
    queryClient.invalidateQueries({ queryKey: ["investors-info"] });
    toast.success("Withdrawal created");
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-1">
        <Button
          size="lg"
          className="flex w-full items-center justify-center rounded-full"
        >
          <BanknoteArrowUp />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdrawal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(makeWithdrawal)}>
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
              <Label content="Withdrawal date" />

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

            <FormFieldGroup<WithdrawalFormValues>
              form={form}
              label="Withdrawal amount"
              name="amount"
              type="number"
              placeholder="amount"
              icon={BanknoteArrowUp}
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
