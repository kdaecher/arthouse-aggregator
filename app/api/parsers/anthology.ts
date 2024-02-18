import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.ANTHOLOGY_FILM_ARCHIVES;

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.calendar_day');

  const showtimes: Showtime[] = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayNum = currentDay.day;


  days.each((_, dayNode) => {    
    if ($(dayNode).attr('name') === currentDayNum.toString()) {
      const moviesPerDay = $(dayNode).find('.calendar_event');

      moviesPerDay.each((_, movieNode) => {
        const timeNode = $(movieNode).contents().filter((_, element) => element.type === 'text');
        let time = timeNode.first().text().trim();
        time = time.replace(/\s:/, ':'); // remove space before colon
        time = time.replace(/PM|AM/i, match => match.toLowerCase()); // convert AM/PM to lowercase

        const linkNode = $(movieNode).find('a');
        const link = linkNode.attr('href');
        const movie = linkNode.text().toLowerCase().trim();

        showtimes.push({
          day: currentDay.toMillis(),
          theater,
          movie,
          time,
          link: `http://anthologyfilmarchives.org${link}`
        });
      });

      currentDay = currentDay.plus({ days: 1 });
      currentDayNum++;
    }
  });

  return showtimes;
}