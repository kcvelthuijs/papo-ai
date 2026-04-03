export type ImageSize = "full" | "small" | "x-small" | "none";

export interface ImageProps {
  name: string;
  tree: string[];
  size: ImageSize;
}
