const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://api.b-audio.vn";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: 60 },
    ...init,
  });
  if (!res.ok) {throw new Error(`API ${path} ${res.status}`);}
  return res.json() as Promise<T>;
}

export function withBase(url?: string | null): string | undefined {
  if (!url) {return undefined;}
  return /^https?:\/\//.test(url) ? url : `${API_BASE}${url}`;
}
