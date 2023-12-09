import { load } from 'cheerio';
import { DateTime } from 'luxon';

import type Showtime from '@/app/types/Showtime';
import Theater from '@/app/types/Theater';

const theater = Theater.FILM_FORUM;

export default function parse(html: string ): Showtime[] {
  const $ = load(html);

  const days = $('[aria-label="This week\'s showtimes at Film Forum"]').find('a');
  const dayTabLinkMap: Array<{ day: DateTime, tabLink: string }> = [];

  let currentDay = DateTime.local({ zone: 'America/New_York' }).set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
  let currentDayAbbr = currentDay.toLocaleString({ weekday: 'short' });

  days.each((_, dayNode) => {
    const dayAbbr = $(dayNode).text();

    while (dayAbbr.toLowerCase() !== currentDayAbbr.toLowerCase()) {
      currentDay = currentDay.plus({ days: 1 });
      currentDayAbbr = currentDay.toLocaleString({ weekday: 'short' });
    };

    dayTabLinkMap.push({
      day: currentDay,
      tabLink: $(dayNode).attr('href') as string,
    });
  });

  const showtimesContainer = $('.showtimes-container');
  const showtimes: Showtime[] = [];

  dayTabLinkMap.forEach(({ day, tabLink }) => {
    const moviesPerDay = $(showtimesContainer).find(tabLink).find('p');

    moviesPerDay.each((_, movieNode) => {
      const movieTitleNode = $(movieNode).find('strong');

      const movieTitleLink = $(movieTitleNode).find('a');

      const movie = [...$(movieTitleLink).contents()]
        .filter(child => child.type === 'text' && $(child).text().trim())
        .map(text => $(text).text().trim().toLowerCase())
        .join(' ');

      const link = $(movieTitleLink).attr('href');

      // Specific edge case to handle 'Film Forum Jr.' shotimes
      // Assuming all other showtimes are pm
      const isFilmForumJrSeries = !!$(movieNode).find('a:contains(FILM FORUM Jr.)').length;

      const times = $(movieTitleNode).nextAll().filter('span');

      times.each((_, timeNode) => {
        const time = $(timeNode).text();
        if (day && movie && time && link) {
          showtimes.push({
            day: day.toMillis(),
            theater,
            time: `${time}${isFilmForumJrSeries ? 'am': 'pm'}`,
            movie,
            link,
          });
        }
      });
    });
  });

  return showtimes;
};
