import type Showtime from '../types/Showtime';
import Theater from '../types/Theater';
import ScrapeMap from './ScrapeMap';

export default async function getData(theater?: Theater): Promise<Showtime[]> {
  const theatersToScrape = theater ?
    ScrapeMap.filter(({ theater: theaterEnum }) => theaterEnum === theater):
    ScrapeMap;

  const showtimes = (await Promise.all(theatersToScrape.map(async ({ url, parser }) => {
    const response = await fetch(url, { cache: 'no-store' });
    const html = await response.text();
    const showtimes = parser(html);
    return showtimes;
  }))).flat();

  return showtimes;
}
