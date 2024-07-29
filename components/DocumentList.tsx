import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon, Slash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import IFramePage from "./Iframe";

const DocumentList = ({ documents, carpeta }: any) => {
  const decodedDocName = decodeURIComponent(carpeta);
  const constructDocumentUrl = (doc: any) => {
    const baseUrl =
      "https://knlnvaglkfltanvfdezt.supabase.co/storage/v1/object/public/Documentos";
    const encodedPath = encodeURIComponent(doc.name); // Asegúrate de que `doc.path` es el camino correcto sin codificar previamente
    return `${baseUrl}/${carpeta}/${encodedPath}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Libreria de documentos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc: any) => (
          <Card key={doc.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="h-8 w-8" />
                <span className="truncate" title={doc.name}>
                  {doc.name}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-1">
                Tamaño: {(doc.metadata.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-sm text-gray-600">
                Formato: {doc.metadata.mimetype}
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Ver documento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <Slash />
                          </BreadcrumbSeparator>

                          <BreadcrumbItem>
                            <BreadcrumbLink>{decodedDocName}</BreadcrumbLink>
                          </BreadcrumbItem>

                          <BreadcrumbSeparator>
                            <Slash />
                          </BreadcrumbSeparator>

                          <BreadcrumbItem>
                            <BreadcrumbPage>{doc.name}</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="w-full h-[80vh]">
                    <IFramePage url={constructDocumentUrl(doc)} doc={doc} />
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
