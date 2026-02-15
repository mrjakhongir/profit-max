import type { AddInvestorValues } from "@/features/add-investor/model/schema";
import { supabaseClient } from "@/supabase-client";
import { toast } from "sonner";
import type { Investor, InvestorBalance } from "../model/types";

export const getInvestors = async (status: boolean = true) => {
  const { data, error } = await supabaseClient
    .from("investors")
    .select("*")
    .eq("is_active", status);

  if (error) throw error;

  return data;
};

export const getInvestorById = async (
  investorId: string,
): Promise<Investor> => {
  const { data, error } = await supabaseClient
    .from("investors")
    .select("*")
    .eq("id", investorId)
    .single();

  if (error) {
    toast.error(error.message);
    console.error("Error fetching investor:", error);
    throw error;
  }

  if (!data) {
    toast.error("Investor not found");
    throw new Error("Investor not found");
  }

  return data;
};

export const getInvestorBalance = async (
  investorId: string,
): Promise<InvestorBalance> => {
  const { data, error } = await supabaseClient
    .rpc("get_investor_balance", { p_investor_id: investorId })
    .single();

  if (error) {
    toast.error(error.message);
    throw error;
  }

  return data as InvestorBalance;
};

export const createInvestor = async (values: AddInvestorValues) => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabaseClient
    .from("investors")
    .insert({
      user_id: user.id,
      name: values.name,
      id_number: values.id_number,
      contract_date: values.contract_date,
      card_number: values.card_number,
      description: values.description || "",
    })
    .select()
    .single();

  if (error) {
    toast.error(error.message);
    throw error;
  }
};
