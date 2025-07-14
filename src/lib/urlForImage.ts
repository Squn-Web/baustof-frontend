import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageObject, SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from 'sanity:client';
import type { CustomImage } from '../../sanity.types';

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source?: SanityImageSource) {
  if (!source) {
    throw new Error('Missing image.asset!');
  }

  return imageBuilder.image(source);
}




// Constants
const LARGEST_VIEWPORT = 1920; // px
const DEFAULT_MIN_STEP = 0.1; // 10%
const DEFAULT_WIDTH_STEPS = [400, 600, 850, 1000, 1150];
const DEFAULT_FULL_WIDTH_STEPS = [360, 414, 768, 1366, 1536, 1920];

// Initialize a builder instance (inject your client here)
// const sanityClient = {} as SanityClient; // TODO: Replace with your Sanity client instance
// const imageBuilder = imageUrlBuilder(sanityClient);

type WidthStep = number;
type MaxWidth = number | '100vw';

export interface GetImagePropsOptions {
  image: CustomImage;
  maxWidth?: MaxWidth;
  minimumWidthStep?: number;
  customWidthSteps?: WidthStep[];
  sizes?: string;
}

export interface ImageProps {
  src: string;
  srcset: string;
  sizes: string;
  width: number;
  height: number;
}

export function getImageDimensions(image: CustomImage): { width: number; height: number; aspectRatio: number } {
  const ref = image.asset?._ref;
  if (!ref) {
    throw new Error('Missing image asset reference (_ref) to extract dimensions.');
  }

  const [, , dimensionSegment] = ref.split('-');
  if (!dimensionSegment) {
    throw new Error(`Invalid image asset _ref format: ${ref}`);
  }

  const [width, height] = dimensionSegment.split('x').map(Number);

  if (Number.isNaN(width) || Number.isNaN(height) || width <= 0 || height <= 0) {
    throw new Error(`Unable to parse valid dimensions from asset _ref: ${ref}`);
  }

  return { width, height, aspectRatio: width / height };
}

export function getImageProps(options: GetImagePropsOptions): ImageProps {
  const {
    image,
    maxWidth: userMaxWidth,
    minimumWidthStep = DEFAULT_MIN_STEP,
    customWidthSteps,
    sizes,
  } = options;

  // Ensure asset exists or throw
  if (!('asset' in image) || !image.asset?._ref) {
    throw new Error('getImageProps: `image.asset._ref` is required.');
  }

  const maxWidth: number =
    typeof userMaxWidth === 'number' ? userMaxWidth : LARGEST_VIEWPORT;

  const builder = imageBuilder.image(image).fit('max').auto('format');
  const { width: originalWidth, aspectRatio } = getImageDimensions(image);

  const baseSizes: number[] = [
    maxWidth,
    ...(customWidthSteps ??
      (typeof userMaxWidth === 'number'
        ? DEFAULT_WIDTH_STEPS
        : DEFAULT_FULL_WIDTH_STEPS)),
  ];

  const retinaSizes = Array.from(
    new Set([
      ...baseSizes,
      ...baseSizes.map((size) => size * 2),
      ...baseSizes.map((size) => size * 3),
    ])
  )
    .sort((a, b) => a - b)
    .filter(
      (size) =>
        size <= originalWidth * 1.1 && // no upscaling above 110%
        size <= maxWidth * 3 // limit to 3x maxWidth
    )
    .filter((size, i, arr) => {
      const next = arr[i + 1];
      return next ? next / size > minimumWidthStep + 1 : true;
    });

  // First available size for width/height
  const fallbackSize = retinaSizes[0] ?? maxWidth;

  const resolvedSizes =
    userMaxWidth === '100vw'
      ? '100vw'
      : sizes ?? `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`;

  
return {
  // zamiast builder.width(maxWidth):
  src: builder.width(fallbackSize).url(),
  srcset: retinaSizes
    .map((size) => `${builder.width(size).url()} ${size}w`)
    .join(', '),
  sizes: resolvedSizes,
  width: fallbackSize,
  height: Math.round(fallbackSize / aspectRatio),
};
}