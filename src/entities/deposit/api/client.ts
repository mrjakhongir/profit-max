import { supabaseClient } from "@/supabase-client";
import { toast } from "sonner";
import type { TransactionResponse } from "../model/types";

export const getTransactionDetails = async (
  depositId: string,
): Promise<TransactionResponse> => {
  const { data, error } = await supabaseClient.rpc("get_deposit_statement", {
    p_deposit_id: depositId,
  });

  if (error) {
    toast.error(error.message);
    throw error;
  }

  return data as TransactionResponse;
};
