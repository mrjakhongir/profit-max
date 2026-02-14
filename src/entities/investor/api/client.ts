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
