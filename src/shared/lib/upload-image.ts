import { supabaseClient } from "@/supabase-client";

export async function uploadImage(userId: string, file: File, storage: string) {
  const extension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const path = `${userId}/${fileName}`;

  const { error } = await supabaseClient.storage
    .from(storage)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabaseClient.storage.from(storage).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
  };
}
