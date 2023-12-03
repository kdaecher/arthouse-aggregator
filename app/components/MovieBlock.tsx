import React from 'react';
import Showtime from '../types/Showtime';
import groupBy from '../utils/groupBy';

import './MovieBlock.css';
import TimeButton from './TimeButton';

type Props = {
  movie: string;
  showtimes: Showtime[];
};

export default function ({ movie, showtimes }: Props) {
  const groupedByTheater = groupBy(showtimes, 'theater');

  return (
    <div
      tabIndex={0}
      id="movie"
      className="py-6"
    >
      <div className="capitalize">
        {movie}
      </div>
      <div id="details-wrapper">
        <div id="details-content">
          {Object.keys(groupedByTheater).map(theater => (
            <div key={`${movie}-${theater}`}>
              <div className="text-xs uppercase font-bold my-2">
                {theater}
              </div>
              <div className="flex flex-row">
                {groupedByTheater[theater].map((showtime: Showtime, index: number) => (
                <div
                  key={`${movie}-${theater}-${showtime.time}`}
                  className={`${index > 0 ? 'mx-1' : 'mr-1'}`}
                >
                  <TimeButton
                    time={showtime.time}
                    link={showtime.link}
                  />
                </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
