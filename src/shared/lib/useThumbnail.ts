import { useEffect, useState } from "react";
import { api } from "./axios";

export function useThumbnail(hash?: string) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!hash) return;

    const load = async () => {
      const res = await api.get(`/files/thumbnail/${hash}`, {
        responseType: "blob"
      });

      const blobUrl = URL.createObjectURL(res.data);
      setUrl(blobUrl);
    };

    load();

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [hash]);

  return url;
}