"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function PDFViewer({ url, doc }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(userAgent));

    // Redirigir automáticamente si es móvil
    if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
      window.open(url, "_blank");
    }
  }, [url]);

  if (isMobile) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-center mb-4">
          Redirigiendo al documento PDF en una nueva pestaña...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      <iframe
        src={url}
        className="w-full h-full"
        title={doc.name}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
