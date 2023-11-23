import React, { useState } from 'react'
import Image from 'next/image';

import ShowtimeList from './ShowtimeList'
import TimeRangeSlider from './TimeRangeSlider'
import filterImage from '../assets/filter.png';
import Showtime from '../types/Showtime';

type Props = {
  startTime: string;
  endTime: string;
  setStartTime: (time: string) => null;
  setEndTime: (time: string) => null;
  resetCounter: number;
  allShowtimes: { day: string, showtimes: Showtime[] }[];
  selectedDay: string;
}

export default function ListView({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
  resetCounter,
  allShowtimes,
  selectedDay,
}: Props) {
  const [shouldShowSlider, setShouldShowSlider] = useState(false);

  return (
    <div className="flex flex-col col-span-6 overflow-y-hidden">
      <div className="flex flex-col p-2 border-b-4">
        <div className="grid grid-cols-6 w-full">
          <span
            onClick={() => setShouldShowSlider(!shouldShowSlider)}
            className="flex font-bold col-span-1 items-center cursor-pointer"
          >
            TIME
            <Image
              src={filterImage}
              alt="filter icon"
              height={16}
              width={16}
              className="ml-2"
            />
          </span>
          <span className="font-bold col-span-3">MOVIE</span>
          <span className="font-bold col-span-2">THEATER</span>
        </div>
        {shouldShowSlider && (
          <TimeRangeSlider
            key={`${resetCounter}`}
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        )}
      </div>
      <ShowtimeList
        key={`${selectedDay}-${startTime}-${endTime}`}
        showtimes={allShowtimes.find(({ day }) => selectedDay === day)?.showtimes || []}
        startTime={startTime}
        endTime={endTime}
      />
    </div>
  );
}
