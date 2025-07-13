import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient } from 'sanity:client';

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source?: SanityImageSource) {
  if (!source) {
    throw new Error('Missing image.asset!');
  }

  return imageBuilder.image(source);
}
