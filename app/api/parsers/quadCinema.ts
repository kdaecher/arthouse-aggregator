import  { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.QUAD_CINEMA;

const zone = 'America/New_York';

function parseDayHeading(heading: string, today: DateTime): DateTime | undefined {
  return [today.year, today.year + 1]
    .map(year => DateTime.fromFormat(`${heading} ${year}`, 'ccc LLLL d yyyy', { zone }))
    .find(day => day.isValid && day >= today);
}

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.now-single-day');

  const showtimes: Showtime[] = [];

  const today = DateTime.local({ zone }).startOf('day');

  days.each((_, dayNode) => {
    const heading = $(dayNode).find('h1').text().trim();
    const currentDay = parseDayHeading(heading, today);

    if (!currentDay) {
      return;
    }

    const moviesPerDay = $(dayNode).find('.single-listing');

    moviesPerDay.each((_, movieNode) => {
      const titleNode = $(movieNode).find('h4').find('a');

      const movie = $(titleNode).text();
      const link = $(titleNode).attr('href');

      const times = $(movieNode).find('.showtimes-list').find('li[class*="time"]').find('a');

      times.each((_, timeNode) => {
        let time = $(timeNode).text();
        time = time.replace('.', ':');

        if (movie && time && link) {
          showtimes.push({
            day: currentDay.toMillis(),
            theater,
            movie,
            time,
            link,
          });
        }
      });
    });
  });


  return showtimes;
}
