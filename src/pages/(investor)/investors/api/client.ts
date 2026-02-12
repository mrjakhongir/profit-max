import { supabaseClient } from "@/supabase-client";

export const getInvestors = async (userId: string, status: boolean = true) => {
  const { data, error } = await supabaseClient
    .from("investors")
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", status)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
