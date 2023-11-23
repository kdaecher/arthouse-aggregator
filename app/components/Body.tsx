import React, { useEffect, useState } from 'react';

import Showtime from '../types/Showtime';
import getShowtimesPerDay from '../utils/getShowtimesPerDay';
import Loader from './Loader';
import groupBy from '../utils/groupBy';
import MovieBlock from './MovieBlock';

export default function Body() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [allShowtimes, setAllShowtimes] = useState<Array<{ day: string, showtimes: Showtime[] }>>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const groupedByMovie = groupBy(allShowtimes.find(({ day }) => selectedDay === day)?.showtimes || [], 'movie');

  useEffect(() => {
    const abortController = new AbortController();
    async function getData() {
      try {
        const data = await getShowtimesPerDay(abortController.signal);
        setAllShowtimes(data);
        setSelectedDay(data[0].day);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setIsLoading(false);
          setIsError(true);
        }
      }
    }
    getData();

    return () => abortController.abort();
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row border-b border-solid border-black pb-4">
        <div className="font-inria italic text-xl mr-4">
          Movies playing
        </div>
        {!isLoading && (
          <select onChange={e => setSelectedDay(e.target.value)}>
            {allShowtimes.map(({ day }) => (
              <option
                key={day}
                value={day}
              >
                {day}
              </option>
            ))}
          </select>
        )}
      </div>
      {isLoading && <Loader />}
      {isError && <div className="w-full py-6">Error</div>}
      {!isLoading && (
        <div className="divide-y divide-dashed divide-black overflow-scroll">
        {Object.keys(groupedByMovie).map(movie => (
          <MovieBlock
            key={movie}
            movie={movie}
            showtimes={groupedByMovie[movie]}
          />
        ))}
        </div>
      )}
    </div >
  );
};
