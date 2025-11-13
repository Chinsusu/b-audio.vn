/**
 * Utility functions for handling media URLs from Strapi
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:1337";

/**
 * Converts Strapi media URLs to use the correct public base URL
 * Handles both relative paths and full URLs with localhost
 */
export function getPublicMediaUrl(url: string | null | undefined): string {
  // Return empty string for null/undefined
  if (!url) {return "";}

  // If already starts with our public API base, return as is
  if (url.startsWith(API_BASE)) {
    return url;
  }

  // If starts with https:// and not localhost, assume it's already public
  if (url.startsWith("https://") && !url.includes("localhost")) {
    return url;
  }

  // If starts with http://localhost:1337, replace with public base
  if (url.startsWith("http://localhost:1337")) {
    return url.replace("http://localhost:1337", API_BASE);
  }

  // If it's a relative path (starts with /), prepend API base
  if (url.startsWith("/")) {
    return `${API_BASE}${url}`;
  }

  // If none of the above, prepend API base with /
  return `${API_BASE}/${url}`;
}

/**
 * Formats Strapi media data to get the public URL
 * Handles both single media and media arrays
 */
export function getStrapiMediaUrl(media: any): string {
  if (!media) {return "";}

  // If it's an array, get the first item
  if (Array.isArray(media) && media.length > 0) {
    media = media[0];
  }

  // Handle different Strapi media object structures
  const url = media?.attributes?.url || media?.url || media;

  return getPublicMediaUrl(url);
}

/**
 * Get formatted image with fallback
 */
export function getImageUrl(imageData: any, fallback: string = ""): string {
  const url = getStrapiMediaUrl(imageData);
  return url || fallback;
}
