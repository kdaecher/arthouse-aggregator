import React, { useState } from 'react';
import Showtime from '../types/Showtime';
import groupBy from '../utils/groupBy';

import './MovieBlock.css';

type Props = {
  movie: string;
  showtimes: Showtime[];
}

export default function ({ movie, showtimes }: Props) {
  const groupedByTheater = groupBy(showtimes, 'theater');

  return (
    <div
      tabIndex={0}
      id="movie"
      className="py-6"
    >
      <div>
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
                  <button
                    key={`${movie}-${theater}-${showtime.time}`}
                    onClick={() => window.open(showtime.link)}
                    className={`border-[0.5px] border-black ${index > 0 ? 'mx-1' : 'mr-1'} p-1 text-s hover:text-white hover:bg-black focus:text-white focus:bg-black`}
                  >
                    {showtime.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
