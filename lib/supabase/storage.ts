import { createClient } from "./client";

export async function getFiles() {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from("Documentos").list("", {
    limit: 100, // Puedes ajustar este valor según tus necesidades
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Error fetching files:", error);
    return [];
  }

  return data;
}
