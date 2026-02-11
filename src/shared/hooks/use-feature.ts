import { supabaseClient } from "@/supabase-client";
import { useQuery } from "@tanstack/react-query";

export interface DictionaryItem {
  value: string;
  label: string;
  available?: string;
}

export function useFeature(feature: string) {
  const query = useQuery<DictionaryItem[]>({
    queryKey: ["features", feature],
    queryFn: () => fetchFeature(feature),
    enabled: Boolean(feature),
  });

  return {
    data: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
  };
}

async function fetchFeature(feature: string) {
  const { data, error } = await supabaseClient
    .from("features")
    .select("value, label, available")
    .eq("type", feature);

  if (error) throw error;

  return data ?? [];
}
