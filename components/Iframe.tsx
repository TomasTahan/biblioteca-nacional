"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

export default function IFramePage({ url, doc }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setIsLoading(false);
      };
    }
  }, [url]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={url}
        className="w-full h-full"
        title={doc.name}
      />
    </div>
  );
}
