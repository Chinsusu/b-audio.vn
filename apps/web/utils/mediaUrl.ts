export function mediaUrl(url?: string) {
  if (!url) {
    return "";
  }
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  const base = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";
  return `${base}${url}`;
}
