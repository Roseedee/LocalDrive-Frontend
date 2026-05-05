import { useEffect, useState } from "react";
import { api } from "./axios";

const cache = new Map<string, string>();

export function useFileContent(id?: string) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!id) {
            setUrl(null);
            setLoading(false);
            return;
        }

        if (cache.has(id)) {
            setUrl(cache.get(id)!);
            return;
        }

        let objectUrl: string | null = null;
        let isActive = true;

        const controller = new AbortController();

        const load = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(`/files/${id}/content`, {
                    responseType: "blob",
                    signal: controller.signal,
                });

                if (!isActive) return;

                objectUrl = URL.createObjectURL(res.data);

                cache.set(id, objectUrl); // 🔥 cache
                setUrl(objectUrl);
            } catch (err: any) {
                if (err.name === "CanceledError") return;
                if (!isActive) return;

                setError(err);
            } finally {
                if (isActive) setLoading(false);
            }
        };

        load();

        return () => {
            isActive = false;
            controller.abort();

            // ❗ ไม่ revoke ถ้าอยู่ใน cache
            // ไม่งั้น component อื่นจะพัง
        };
    }, [id]);

    return { url, loading, error };
}