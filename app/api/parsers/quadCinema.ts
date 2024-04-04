import  { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.QUAD_CINEMA;

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.now-single-day');

  const showtimes: Showtime[] = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayString = currentDay.toFormat('ccc LLLL d');

  days.each((_, dayNode) => {
    const day = $(dayNode).find('h1').text();

    while (day !== currentDayString) {
      currentDay = currentDay.plus({ days: 1 });
      currentDayString = currentDay.toFormat('ccc LLLL d');
    }
    const moviesPerDay = $(dayNode).find('.single-listing');

    moviesPerDay.each((_, movieNode) => {
      const titleNode = $(movieNode).find('h4').find('a');

      const movie = $(titleNode).text();
      const link = $(titleNode).attr('href');

      const times = $(movieNode).find('.showtimes-list').find('a');

      times.each((_, timeNode) => {
        let time = $(timeNode).text();
        time = time.replace('.', ':');

        if (day && movie && time && link) {
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
