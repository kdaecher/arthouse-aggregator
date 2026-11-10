import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.METROGRAPH;

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.day-selector-day')

  const showtimes: Showtime[] = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayString = currentDay.toFormat('yyyy-MM-dd');

  days.filter((_, dayNode) => $(dayNode).attr('style') !== "display: none;").each((_, dayNode) => {
    const day = $(dayNode).attr('data-vars-ga-label')

    if (!day?.trim()) {
      // continue
      return;
    }

    while (!day.toLowerCase().includes(currentDayString.toLowerCase())) {
      currentDay = currentDay.plus({ days: 1 });
      currentDayString = currentDay.toFormat('yyyy-MM-dd');
    };

    const moviesPerDay = $(`#calendar-list-day-${currentDayString}`).children();
    moviesPerDay.each((_, movieNode) => {
      const titleNode = $(movieNode).find('.title');
      const movie = $(titleNode).text();
      const link = $(titleNode).attr('href');

      const times = $(movieNode).find('a[title="Buy Tickets"]');
      times.each((_, timeNode ) => {
        const time = $(timeNode).text();

        if (day && movie && time && link) {
          showtimes.push({
            day: currentDay.toMillis(),
            theater,
            movie,
            time,
            link: `https://metrograph.com${link}`,
          });
        }
      });
    });
  });

  return showtimes;
};
