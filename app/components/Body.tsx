import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import Showtime from '../types/Showtime';
import ShowtimeList from './ShowtimeList';
import getShowtimesPerDay from '../utils/getShowtimesPerDay';
import TimeRangeSlider from './TimeRangeSlider';
import DayButton from './DayButton';
import Loader from './Loader';
import Header from './Header';
import filterImage from '../assets/filter.png';

export default function Body() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [allShowtimes, setAllShowtimes] = useState<Array<{ day: string, showtimes: Showtime[] }>>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const [startTime, setStartTime] = useState('12:00pm');
  const [endTime, setEndTime] = useState('11:59pm');
  const [shouldShowSlider, setShouldShowSlider] = useState(false);

  const [resetCounter, setResetCounter] = useState(0);

  const resetFilters = () => {
    setSelectedDay(allShowtimes[0].day);
    setStartTime('12:00pm');
    setEndTime('11:59pm');
    setResetCounter(resetCounter + 1);
  }

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
    <div className="grid grid-cols-12 grid-rows-[auto_1fr] w-full h-full gap-10">
      <div className="col-start-4 col-span-6 mt-10">
        <Header onClick={resetFilters} />
      </div>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="flex flex-col col-start-2 col-span-2 items-end text-right">
          <div className="flex flex-col">
            {allShowtimes.map(({ day }) => (
              <div className="my-1" key={day}>
                <DayButton
                  isSelected={selectedDay === day}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.toUpperCase()}
                </DayButton>
              </div>
            ))}
          </div>
        </div>
      )}
      {!isLoading && selectedDay && (
        <div className="flex flex-col col-span-6 overflow-y-hidden">
          <div className="flex flex-col p-2 border-b-4">
            <div className="grid grid-cols-6 w-full">
              <span
                onClick={() => setShouldShowSlider(!shouldShowSlider)}
                className="flex font-bold col-span-1 items-center cursor-pointer"
              >
                TIME
                <Image src={filterImage} alt="filter icon" height={16} width={16} className="ml-2" />
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
      )}
    </div >
  );
};
