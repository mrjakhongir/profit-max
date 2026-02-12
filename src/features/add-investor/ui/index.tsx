import { useAuth } from "@/features/auth/hooks/use-auth";
import { cn } from "@/shared/lib/utilities";
import { Button } from "@/shared/ui/button";
import CardNumberInput from "@/shared/ui/custom/card-number-input";
import Container from "@/shared/ui/custom/container";
import DatePicker from "@/shared/ui/custom/date-picker";
import FormFieldGroup from "@/shared/ui/custom/form-field";
import IDInputMask from "@/shared/ui/custom/id-number-input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/shared/ui/field";
import { Textarea } from "@/shared/ui/textarea";
import { supabaseClient } from "@/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { HandCoins, Loader2, Percent, UserRoundPlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { maskCardNumber } from "../lib/mask-card-number";
import { defaultValues } from "../model/constants";
import { investorSchema, type AddInvestorValues } from "../model/schema";

export const AddInvestor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<AddInvestorValues>({
    resolver: zodResolver(investorSchema),
    mode: "onChange",
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = form;

  const addNewInvestor = async (values: AddInvestorValues) => {
    if (!user) {
      toast.error("First sign in to your account");
      return;
    }

    const { error } = await supabaseClient
      .from("investors")
      .insert({
        ...values,
        card_number: maskCardNumber(values.card_number),
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      console.error(error);
    }

    toast.success("Investor created successfully 🎉");
    reset();
    navigate("/investors");
  };

  return (
    <div className="relative mb-20">
      <Container>
        <form onSubmit={handleSubmit(addNewInvestor)}>
          <FieldGroup className="glass-bg border-accent/10 relative z-30 gap-3 rounded-xl border p-4">
            <FormFieldGroup
              form={form}
              label="Fullname"
              name="name"
              type="text"
              placeholder="Nusratov Jahongir"
              icon={UserRoundPlus}
            />

            <Field data-invalid={!!errors.id_number}>
              <FieldLabel htmlFor="id_number">
                ID Number <span className="text-red-500">*</span>
              </FieldLabel>

              <Controller
                name="id_number"
                control={control}
                render={({ field }) => (
                  <IDInputMask
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                  />
                )}
              />

              <FieldDescription
                id="id_number-error"
                className={cn(
                  "text-xs",
                  errors.id_number ? "visible" : "invisible",
                )}
              >
                {errors?.id_number?.message}
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.contract_date}>
              <FieldLabel htmlFor="contract_date">
                Contract Date <span className="text-red-500">*</span>
              </FieldLabel>

              <Controller
                name="contract_date"
                control={control}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} />
                )}
              />

              <FieldDescription
                id="contract_date-error"
                className={cn(
                  "text-xs",
                  errors.contract_date ? "visible" : "invisible",
                )}
              >
                {errors?.contract_date?.message}
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.card_number}>
              <FieldLabel htmlFor="card_number">
                Card info <span className="text-red-500">*</span>
              </FieldLabel>

              <Controller
                name="card_number"
                control={control}
                render={({ field }) => (
                  <CardNumberInput
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                  />
                )}
              />

              <FieldDescription
                id="card_info-error"
                className={cn(
                  "text-xs",
                  errors.card_number ? "visible" : "invisible",
                )}
              >
                {errors?.card_number?.message}
              </FieldDescription>
            </Field>

            <FormFieldGroup
              form={form}
              label="Investment amount"
              name="amount"
              type="number"
              placeholder="Enter an amount"
              icon={HandCoins}
            />

            <FormFieldGroup
              form={form}
              label="Interest rate"
              name="interest_rate"
              type="number"
              placeholder="Enter an interest rate"
              icon={Percent}
            />

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                {...register("description")}
                className="bg-white"
                autoComplete="off"
              />
            </Field>
          </FieldGroup>

          <div className="fixed right-0 bottom-0 left-0 z-30 mb-2">
            <Container className="relative z-20">
              <Button
                size="lg"
                className="flex w-full items-center justify-center rounded-full"
                type="submit"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </Container>
          </div>
        </form>
      </Container>

      <img
        src="/mask-right.png"
        alt="mask"
        className="absolute top-1/2 right-0 z-10"
      />
    </div>
  );
};
