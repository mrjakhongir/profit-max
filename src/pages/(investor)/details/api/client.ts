import { supabaseClient } from "@/supabase-client";
import { toast } from "sonner";
import type { Balance } from "../model/types";

export const getInvestorById = async (investorId: string) => {
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

export const getDeposits = async (investorId: string) => {
  const { data, error } = await supabaseClient
    .from("deposits")
    .select("*")
    .eq("investor_id", investorId);

  if (error) {
    toast.error(error.message);
    console.error("Error fetching investments:", error);
    throw error;
  }

  if (!data) {
    toast.error("Investments not found");
    throw new Error("Investments not found");
  }

  return data;
};

export async function getDepositHistory(depositId: string) {
  const { data, error } = await supabaseClient.rpc("get_deposit_history", {
    p_deposit_id: depositId,
  });

  if (error) {
    toast.error(error.message);
    console.error("Error fetching deposit history:", error);
    throw error;
  }

  return data;
}

export const getInvestorBalance = async (
  investorId: string,
): Promise<Balance> => {
  const { data, error } = await supabaseClient
    .rpc("get_investor_balance", { p_investor_id: investorId })
    .single();

  if (error) {
    toast.error(error.message);
    throw error;
  }

  return data as Balance;
};
