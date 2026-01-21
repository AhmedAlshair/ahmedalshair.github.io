import { getImage } from 'astro:assets';

export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S+/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  );
};

export const normalizeUrlPath = (path: string) =>
  path.replace(/^\/|\/$/g, '').toLowerCase();

export const optimizeImages = (
  images: ImageMetadata | ImageMetadata[],
  format: 'webp' | 'avif' | 'jpg' | 'png' = 'webp',
) => {
  const imageArray = Array.isArray(images) ? images : [images];
  return Promise.all(imageArray.map((src) => getImage({ src, format })));
};
