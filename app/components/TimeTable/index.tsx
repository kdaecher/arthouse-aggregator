import React from 'react';

import { colNumber } from '@/app/utils/gridStyles';
import Showtime from '@/app/types/Showtime';
import groupBy from '@/app/utils/groupBy';
import { compareTime } from '@/app/utils/sortByTime';

import TimesRow from './TimesRow';
import TheaterRow from './TheaterRow';

interface Props {
  showtimes: Showtime[];
}

export default function TimeTable ({ showtimes }: Props) {
  const showtimesByTheater = groupBy(showtimes, 'theater');
  const theaters = Object.keys(showtimesByTheater);

  const timesFormatted = showtimes
    .map(({ time }) => time)
    .sort((a, b) => compareTime(a, b))
    .map(time => {
      let match = time.match(/(\d{1,2}):(\d{2})\s?(am|pm)/i);
      return match ? match[1] + match[3].toLowerCase() : '';
    });
  const uniqueTimes = new Set(timesFormatted);
  const timesArray = Array.from(uniqueTimes);
  const numCols = uniqueTimes.size + 1;

  return (
    <div
      className={`
        grid
        ${colNumber[numCols]}
        gap-x-3
        gap-y-1
        overflow-x-scroll
      `}
    >
      <TimesRow times={timesArray} />
      {theaters.map((theater, index) => 
        <TheaterRow
          rowNum={index+2}
          key={theater}
          theater={theater}
          showtimes={showtimesByTheater[theater]}
          times={timesArray}
        />
      )}
    </div>
  );
}