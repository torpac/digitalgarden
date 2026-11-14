const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function path(to: string = '/') {
  return `${base}${to.startsWith('/') ? to : `/${to}`}`;
}

export function safeExternalUrl(url?: string) {
  if (!url) return undefined;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

export function mediaUrl(url?: string) {
  if (!url) return undefined;
  return url.startsWith('/') && !url.startsWith('//') ? path(url) : safeExternalUrl(url);
}

export function spotifyEmbedUrl(url?: string) {
  if (!url) return null;
  const match = url.match(/^https:\/\/open\.spotify\.com\/(?:intl-[A-Za-z-]+\/)?playlist\/([A-Za-z0-9]+)(?:[/?#].*)?$/);
  return match ? `https://open.spotify.com/embed/playlist/${match[1]}` : null;
}

export function sortRanked<T extends { data: { rank?: number; rating?: number; title: string } }>(entries: T[]): T[] {
  return [...entries].sort((a, b) =>
    (a.data.rank ?? Infinity) - (b.data.rank ?? Infinity) ||
    (b.data.rating ?? -1) - (a.data.rating ?? -1) ||
    a.data.title.localeCompare(b.data.title)
  );
}
