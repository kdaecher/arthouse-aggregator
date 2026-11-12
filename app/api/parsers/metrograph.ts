import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.METROGRAPH;

const zone = 'America/New_York';

function parseDayLabel(label: string, today: DateTime): DateTime | undefined {
  const isoDate = label.match(/\d{4}-\d{2}-\d{2}/)?.[0];

  if (!isoDate) {
    return;
  }

  const day = DateTime.fromISO(isoDate, { zone });

  if (day.isValid && day >= today) {
    return day;
  }
}

export default function parse(html: string): Showtime[] {
  const $ = load(html);

  const days = $('.day-selector-day');

  const showtimes: Showtime[] = [];

  const today = DateTime.local({ zone }).startOf('day');

  days.filter((_, dayNode) => $(dayNode).attr('style') !== "display: none;").each((_, dayNode) => {
    const label = $(dayNode).attr('data-vars-ga-label') ?? '';
    const currentDay = parseDayLabel(label, today);

    if (!currentDay) {
      return;
    }

    const currentDayString = currentDay.toFormat('yyyy-MM-dd');
    const moviesPerDay = $(`#calendar-list-day-${currentDayString}`).children();
    moviesPerDay.each((_, movieNode) => {
      const titleNode = $(movieNode).find('.title');
      const movie = $(titleNode).text();
      const link = $(titleNode).attr('href');

      const times = $(movieNode).find('a[title="Buy Tickets"]');
      times.each((_, timeNode ) => {
        const time = $(timeNode).text();

        if (movie && time && link) {
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
