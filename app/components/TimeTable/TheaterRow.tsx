import React from 'react';

import getHourOfTime from '@/app/utils/getHourOfTime';

import LinkButton from '../LinkButton';
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
            const hour = getHourOfTime(time);
            const col = times.indexOf(hour) + 2;

            return (
              <div
                key={`${theater}-${movie}-${time}`}
                className={`${colStart[col]}`}
              >
                <LinkButton
                  onClick={() => window.open(link)}
                >
                  {movie}
                </LinkButton>
              </div>
            );
          })
        }
    </div>
  );
}