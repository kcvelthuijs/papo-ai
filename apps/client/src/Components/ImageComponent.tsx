import { useEffect, useState } from 'react';
import axios from 'axios';

import { Skeleton } from '@workspace/ui';
import { getImage } from '@workspace/connectors';
import { type ImageComponentProps } from '@workspace/webtypes';

function ImageComponent({ name, tree, size, className }: ImageComponentProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    let currentUrl: string | null = null;

    const load = async () => {
      setLoading(true);
      try {
        const url = await getImage({ name, tree, size }, cancelToken.token);
        setImgSrc(url);
      } catch (err) {
        if (axios.isCancel(err)) {
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      cancelToken.cancel();
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [name, tree.join('/'), size]);

  return (
    <div>
      {loading ? (
        <Skeleton className='flex flex-col w-full aspect-2/1 animate-pulse bg-gray-200 ' />
      ) : (
        <img src={imgSrc || 'null'} alt={name} className={className} />
      )}
    </div>
  );
}

export default ImageComponent;
