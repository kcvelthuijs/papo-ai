import { type ImageSize as ImageSizeType } from "@workspace/images/src/imageSchema";

export type ImageSize = ImageSizeType;

export interface ImageComponentProps {
  name: string;
  tree: string[];
  size: ImageSize;
  className?: string;
}
