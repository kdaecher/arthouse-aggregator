'use client';
import React, { useState } from 'react';

import Showtime from '../types/Showtime';
import groupBy from '../utils/groupBy';
import MovieList from './MovieList';
import DaySelector from './DaySelector';

export default function Home({ showtimes }: { showtimes: { [day: string]: Showtime[] }}) {
  const days = Object.keys(showtimes).map(day => parseInt(day)).sort();
  const [selectedDay, setSelectedDay] = useState<number>(days[0]);

  const groupedByMovie = groupBy(showtimes[selectedDay] || [], 'movie');

  return (
    <div className="flex flex-col w-full h-full">
      <DaySelector days={days} onChange={setSelectedDay} />
      <MovieList movies={groupedByMovie} />
    </div>
  );
};
