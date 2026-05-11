import { useEffect, useState } from "react";
import { api } from "./axios";

export function useThumbnail(hash?: string | null) {

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {

    if (!hash) {
      setUrl(null);
      return;
    }

    let blobUrl: string | null = null;

    const load = async () => {

      try {

        const res = await api.get(
          `/files/${hash}/thumbnail`,
          {
            responseType: "blob"
          }
        );

        blobUrl = URL.createObjectURL(res.data);

        setUrl(blobUrl);

      } catch (err) {

        console.error(err);

        setUrl(null);
      }
    };

    load();

    return () => {

      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };

  }, [hash]);

  return url;
}