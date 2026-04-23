import { type ImageSize as dtoImageSize } from '@workspace/dtotypes';

export type ImageSize = dtoImageSize;

export interface ImageComponentProps {
  name: string;
  tree: string[];
  size: ImageSize;
  className?: string;
}
