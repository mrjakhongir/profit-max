import { useDeposits } from "@/pages/(investor)/details/api/query";
import type { Deposit } from "@/pages/(investor)/details/model/types";
import { cn } from "@/shared/lib/utilities";
import { Button } from "@/shared/ui/button";
import DatePicker from "@/shared/ui/custom/date-picker";
import Label from "@/shared/ui/custom/fields/field-label";
import FormFieldGroup from "@/shared/ui/custom/fields/form-field-group";
import LoaderCenter from "@/shared/ui/custom/loader";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
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
  const [open, setOpen] = useState(false);

  const { data: deposits, isLoading, error } = useDeposits(investorId || "");

  const form = useForm<WithdrawalFormValues>({
    resolver: zodResolver(withdrawalSchema),
    mode: "onChange",
    defaultValues: defaultValues,
  });

  if (isLoading) return <LoaderCenter />;

  if (error) {
    toast.error(error.message);
    console.error(error);
    return;
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const makeWithdrawal = async (values: WithdrawalFormValues) => {
    if (!investorId) return;

    const payload = {
      ...values,
      investor_id: investorId,
    };

    const { error } = await supabaseClient
      .from("withdrawals")
      .insert([payload])
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    // Update deposit amount (reduce by withdrawal amount)
    const { error: updateError } = await supabaseClient
      .from("deposits")
      .update({
        amount: supabaseClient.rpc(`amount - ${values.amount}`),
      })
      .eq("id", values.deposit_id);

    if (updateError) {
      toast.error("Withdrawal created but failed to update deposit");
      console.error(updateError);
      return;
    }

    toast.success("Withdrawal created");
  };

  console.log(errors);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-1">
        <Button
          size="lg"
          className="flex w-full items-center justify-center rounded-full"
          disabled={deposits?.length === 0}
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
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-45">
                      {isLoading ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <SelectValue placeholder="Select deposit" />
                      )}
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {deposits?.map((deposit: Deposit) => (
                          <SelectItem key={deposit.id} value={deposit.id}>
                            ${deposit.amount} - {deposit.date}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
