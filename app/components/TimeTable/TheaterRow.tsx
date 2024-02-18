import React from 'react';
import Showtime from '../../types/Showtime';
import { compareTime } from '../../utils/sortByTime';
import {
  colStart,
  rowStart,
} from '../../utils/gridStyles';

interface Props {
  theater: string;
  showtimes: Showtime[];
  times: string[];
  rowNum: number;
}

export default function TheaterRow({ theater, showtimes, times, rowNum }: Props) {
  return (
    <div 
      className={`
        grid
        grid-cols-subgrid
        col-span-full
        gap-y-2
        items-start
        ${rowStart[rowNum]}
        grid-flow-col
        align-items-start
        border-b
        border-solid
        border-chartreuse
      `}
    >
      <span className="row-span-full">{theater}</span> 
        {showtimes
          .sort((a, b) => compareTime(a.time, b.time))
          .map(({ time, movie, link }) => {
            const match = time.match(/(\d{1,2}):(\d{2})\s?(am|pm)/i);
            const hour = match ? match[1] + match[3].toLowerCase() : '';
            const col = times.indexOf(hour) + 2;

            return (
              <button
                key={`${theater}-${movie}-${time}`}
                onClick={() => window.open(link)}
                before-value-hover={`${time}`}
                before-value={movie}
                className={`
                  capitalize
                  text-left
                  hover:text-chartreuse
                  focus:text-chartreuse
                  ${colStart[col]}
                `}
              >
                {movie}
              </button>
            );
          })
        }
    </div>
  );
}