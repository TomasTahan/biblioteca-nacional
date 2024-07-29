import { createClient } from "@/lib/supabase/server";
import DocumentList from "@/components/DocumentList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FolderIcon, AlertTriangleIcon, Slash } from "lucide-react";

export default async function DocPage({
  params: { docName },
}: {
  params: { docName: string };
}) {
  const decodedDocName = decodeURIComponent(docName);
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("Documentos")
    .list(decodedDocName, {
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Error fetching documents:", error);
    return (
      <Alert variant="destructive">
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error loading the documents. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbPage>{decodedDocName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FolderIcon className="h-8 w-8" />
          <span>{decodedDocName}</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Hay {data.length} Documentos{data.length !== 1 ? "s" : ""} en esta
          carpeta.
        </p>
      </div>

      <DocumentList documents={data} carpeta={docName} />
    </div>
  );
}
