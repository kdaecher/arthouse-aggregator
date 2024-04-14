import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.IFC_CENTER;

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.daily-schedule');

  const showtimes: Showtime[] = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayString = currentDay.toFormat('ccc LLL d');

  days.each((_, dayNode) => {
    const day = $(dayNode).find('h3').first().text();

    if (day === 'Coming Soon') {
      return;
    }

    while (day !== currentDayString) {
      currentDay = currentDay.plus({ days: 1 });
      currentDayString = currentDay.toFormat('ccc LLL d');
    }
    const moviesPerDay = $(dayNode).find('.details');

    moviesPerDay.each((_, movieNode) => {
      const titleNode = $(movieNode).find('h3');
      const movie = $(titleNode).text();
      const link = $(titleNode).find('a').attr('href');

      const times = $(movieNode).find('.times').find('li');
      

      times.each((_, timeNode) => {
        let time = $(timeNode).text().trim();
        time = time.replace(/\s:/, ':'); // remove space before colon
        time = time.replace(/PM|AM/i, match => match.toLowerCase()); // convert AM/PM to lowercase

        if (link) {
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