import type Showtime from '../types/Showtime';
import groupBy from '../utils/groupBy';
import ScrapeMap from './ScrapeMap';

export default async function getData(): Promise<Record<string, Showtime[]>> {
  const showtimes = (await Promise.all(ScrapeMap.map(async ({ url, parser }) => {
    const response = await fetch(url, { cache: 'no-store' });
    const html = await response.text();
    const showtimes = parser(html);
    return showtimes;
  }))).flat();

  return groupBy(showtimes, 'day');
}
