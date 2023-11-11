import React, { useState } from 'react';

import { default as ShowtimeType } from '../types/Showtime';

import { compareTime } from '../utils/sortTimes';

import filterImage from '../assets/filter.png';
import Showtime from './Showtime';
import Image from 'next/image';
import TimeRangeSlider from './TimeRangeSlider';

type Props = {
  showtimes: ShowtimeType[];
  startTime: string;
  endTime: string;
}


export default function ShowtimeList({ showtimes, startTime, endTime }: Props) {
  const showtimesFilteredByTime = showtimes.filter(({ time }) => (
    compareTime(time, startTime) >= 0 && compareTime(time, endTime) <= 0
  ));
  return (
    <div className={`snap-y flex flex-col w-full h-full items-start divide-y overflow-y-scroll`}>
      {showtimesFilteredByTime.map(({ time, movie, theater, link }) => (
        <Showtime
          key={`${time}-${movie}-${theater}`}
          time={time}
          movie={movie}
          theater={theater}
          link={link}
        />
      ))}
    </div>
  );
}
