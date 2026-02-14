import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/shared/lib/utilities";
import { Button } from "@/shared/ui/button";
import DatePicker from "@/shared/ui/custom/date-picker";
import Label from "@/shared/ui/custom/fields/field-label";
import FormFieldGroup from "@/shared/ui/custom/fields/form-field-group";
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
import { useQueryClient } from "@tanstack/react-query";
import { BanknoteArrowDown, HandCoins, Loader2, Percent } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { defaultValues } from "../model/constants";
import { depositSchema, type DepositFormValues } from "../model/schema";

export const MakeDeposit = () => {
  const { user } = useAuth();
  const { id: investorId } = useParams();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const form = useForm<DepositFormValues>({
    resolver: zodResolver(depositSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const createDeposit = async (values: DepositFormValues) => {
    if (!user || !investorId) return;

    const payload = {
      ...values,
      investor_id: investorId,
      user_id: user.id,
    };

    const { error } = await supabaseClient
      .from("deposits")
      .insert([payload])
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Deposit created");
    reset();
    queryClient.invalidateQueries({ queryKey: ["deposits"] });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-1">
        <Button
          size="lg"
          className="flex w-full items-center justify-center rounded-full"
        >
          <BanknoteArrowDown />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>Yeeeeeey, new deposit 🎉</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(createDeposit)}>
          <FieldGroup className="gap-3">
            <Field data-invalid={!!errors.date} className="gap-1">
              <Label content="Deposit date" />

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

            <FormFieldGroup<DepositFormValues>
              form={form}
              label="Investment amount"
              name="amount"
              type="number"
              placeholder="amount"
              icon={HandCoins}
            />

            <FormFieldGroup<DepositFormValues>
              form={form}
              label="Interest rate"
              name="interest_rate"
              type="number"
              placeholder="interest rate"
              icon={Percent}
            />
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
