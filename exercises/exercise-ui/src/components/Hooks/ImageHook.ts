import { useEffect, useState } from 'react';
import { fetchImageBlob } from '@workspace/connectors';

import type { ImageProps } from '@workspace/dtotypes';

export function useImage(props: ImageProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    const load = async () => {
      setLoading(true);

      const blob = await fetchImageBlob(props);

      if (!blob || cancelled) return;

      objectUrl = URL.createObjectURL(blob);
      setUrl(objectUrl);

      setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [props.name, props.size, props.tree.join('/')]);

  return { url, loading };
}
