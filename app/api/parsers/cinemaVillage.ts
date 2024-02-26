import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.CINEMA_VILLAGE;

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.calendar-day');

  const showtimes: Showtime[] = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayNum = currentDay.day;

  days.each((_, dayNode) => {
    if ($(dayNode).find('.calendar-date').text() === currentDayNum.toString()) {
      const moviesPerDay = $(dayNode).find('li');

      moviesPerDay.each((_, movieNode) => {
        const movie = $(movieNode).find('a').text().toLowerCase().trim();
        const link = $(movieNode).find('a').attr('href');
        const times = $(movieNode).find('.shows').children();

        times.each((_, timeNode) => {
          let time = $(timeNode).text().trim();
          time = time.replace(/PM|AM/i, match => match.toLowerCase()); // convert AM/PM to lowercase

          if (movie && time && link) {
            showtimes.push({
              day: currentDay.toMillis(),
              theater,
              movie,
              time,
              link: `https://www.cinemavillage.com${link}`
            });  
          }
        });
      });
      
      currentDay = currentDay.plus({ days: 1 });
      currentDayNum++;
    }
  });

  return showtimes;
}