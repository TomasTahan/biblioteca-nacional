import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FolderIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function Home({ searchParams }: any) {
  const searchTerm = searchParams.search || "";

  const documents = [
    { name: "Calderas, Calefonts" },
    { name: "Capacitacion Kolsan" },
    { name: "Descalcificadores" },
    { name: "Grupo Electrogeno" },
    { name: "Hidroneumatico" },
    { name: "Intercambiador de calor" },
    { name: "Normas Electricas" },
    { name: "Normativas" },
    { name: "Quemadores" },
    { name: "Testo" },
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Biblioteca de Documentos</h1>
        <p className="text-xl">
          Explore nuestra colección de documentos técnicos y recursos.
        </p>
      </div>

      <form action="/" method="get" className="mb-6 relative">
        <Input
          type="text"
          name="search"
          placeholder="Buscar carpetas..."
          defaultValue={searchTerm}
          className="pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Button
          type="submit"
          className="absolute right-0 top-1/2 transform -translate-y-1/2"
          variant="outline"
        >
          Buscar
        </Button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card
            key={doc.name}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <FolderIcon className="h-8 w-8 text-blue-500" />
              <CardTitle className="flex-1 truncate">{doc.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Explore los documentos relacionados con {doc.name}.
              </p>
              <Link href={`/doc/${encodeURIComponent(doc.name)}`} passHref>
                <Button className="w-full">Abrir carpeta</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
