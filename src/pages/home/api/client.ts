import { supabaseClient } from "@/supabase-client";
import type { DashboardBalance } from "../model/types";

export const getDashboardBalance = async (): Promise<DashboardBalance> => {
  const { data, error } = await supabaseClient.rpc("get_dashboard_balance");
  if (error) throw error;
  return data;
};
