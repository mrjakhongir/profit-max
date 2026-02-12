import { supabaseClient } from "@/supabase-client";
import { toast } from "sonner";

export const getInvestorById = async (userId: string, investorId: string) => {
  const { data, error } = await supabaseClient
    .from("investors")
    .select("*")
    .eq("user_id", userId)
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
