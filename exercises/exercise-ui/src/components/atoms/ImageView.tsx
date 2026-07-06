import { Skeleton } from '@workspace/ui';
import { useImage } from '../Hooks/ImageHook';

import type { ImageComponentProps } from '@workspace/webtypes';

export function ImageView(props: ImageComponentProps) {
  const { url, loading } = useImage(props);

  if (loading) {
    return (
      <Skeleton className='w-180 h-101 aspect-2/1 mx-2 animate-pulse bg-gray-200' />
    );
  }

  return (
    <>
      <img src={url ?? ''} alt={props.name} className={props.className} />
    </>
  );
}
