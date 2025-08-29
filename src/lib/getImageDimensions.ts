import type { CustomImage } from "../../sanity.types";

// Union type to handle both CustomImage and project image types
type ImageWithAsset = CustomImage | {
  asset: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [key: string]: any;
  } | null;
  alt?: string;
};

export function getImageDimensions(image: ImageWithAsset): {
  width: number;
  height: number;
  aspectRatio: number;
} {
  const ref = image.asset?._ref;
  if (!ref) {
    throw new Error(
      "Missing image asset reference (_ref) to extract dimensions.",
    );
  }

  const [, , dimensionSegment] = ref.split("-");
  if (!dimensionSegment) {
    throw new Error(`Invalid image asset _ref format: ${ref}`);
  }

  const [width, height] = dimensionSegment.split("x").map(Number);

  if (
    Number.isNaN(width) ||
    Number.isNaN(height) ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error(`Unable to parse valid dimensions from asset _ref: ${ref}`);
  }

  return { width, height, aspectRatio: width / height };
}
