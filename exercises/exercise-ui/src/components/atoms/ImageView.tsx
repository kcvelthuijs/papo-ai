import { Skeleton } from '@workspace/ui';
import { useImage } from '../Hooks/ImageHook';

import type { ImageComponentProps } from '@workspace/webtypes';

export function ImageView(props: ImageComponentProps) {
  const { url, loading } = useImage(props);

  if (loading) {
    return (
      <Skeleton className='w-full aspect-[2/1] animate-pulse bg-gray-200' />
    );
  }

  return <img src={url ?? ''} alt={props.name} className={props.className} />;
}
