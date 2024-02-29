import React, { useState } from 'react';

import Showtime from '@/app/types/Showtime';
import groupBy from '@/app/utils/groupBy';
import { compareTime } from '@/app/utils/sortByTime';
import TimeAccordion from './TimeAccordion';
import getHourOfTime from '@/app/utils/getHourOfTime';

interface Props {
  showtimes: Showtime[];
}

export default function TimeList ({ showtimes }: Props) {
  const [openTime, setOpenTime] = useState<string>();
  const showtimesByTime = groupBy(showtimes.map(showtime => ({...showtime, time: getHourOfTime(showtime.time)})), 'time');

  const timesFormatted = showtimes
    .map(({ time }) => time)
    .sort((a, b) => compareTime(a, b))
    .map(time => getHourOfTime(time));
  const uniqueTimes = new Set(timesFormatted);
  const timesArray = Array.from(uniqueTimes);

  return (
    <div
      className={`
        flex
        flex-col
      `}
    >
      {timesArray.map(time => (
        <TimeAccordion
          key={time}
          time={time}
          showtimes={showtimesByTime[time]}
          onClick={() => setOpenTime(openTime === time ? undefined : time)}
          isOpen={openTime === time}
        />
      ))}
    </div>
  );
}