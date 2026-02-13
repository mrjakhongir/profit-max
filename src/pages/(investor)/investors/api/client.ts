import { supabaseClient } from "@/supabase-client";

export const getInvestors = async (status: boolean = true) => {
  const { data, error } = await supabaseClient
    .from("investors")
    .select("*")
    .eq("is_active", status);

  if (error) throw error;

  return data;
};
