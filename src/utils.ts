// UTC keeps date-only frontmatter (e.g. `2026-07-28`, written by Pages CMS)
// from shifting a day when formatted. Posts with an explicit time still render
// on their intended calendar day.
const DATE_TZ = 'UTC';

/** Long, human date in pt-BR, e.g. "17 de janeiro de 2026". */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: DATE_TZ,
  }).format(date);
}

/** Compact date for lists, e.g. "17 jan 2026". */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: DATE_TZ,
  })
    .format(date)
    .replace('.', '');
}

/** Day + month only, e.g. "17 jan". */
export function formatDayMonth(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: DATE_TZ })
    .format(date)
    .replace('.', '');
}

export function getYear(date: Date): number {
  return Number(
    new Intl.DateTimeFormat('en', { year: 'numeric', timeZone: DATE_TZ }).format(date),
  );
}

/** Rough reading time in Portuguese from raw markdown. */
export function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de leitura`;
}

/** Plain-text excerpt from markdown for cards and meta descriptions. */
export function excerpt(markdown: string, maxWords = 32): string {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = plain.split(' ');
  return words.length > maxWords ? words.slice(0, maxWords).join(' ') + '…' : plain;
}
