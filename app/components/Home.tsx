'use client';
import React, { useState } from 'react';

import Showtime from '../types/Showtime';
import DaySelect from './DaySelect';
import TimeTable from './TimeTable';
import TimeList from './TimeList';

export default function Home({ showtimes }: { showtimes: { [day: string]: Showtime[] }}) {
  const days = Object.keys(showtimes).map(day => parseInt(day)).sort();
  const [selectedDay, setSelectedDay] = useState<number>(days[0]);
  const showtimesForDay = showtimes[selectedDay] || [];

  return (
    <>
      <DaySelect
        days={days}
        selected={selectedDay}
        onChange={setSelectedDay}
      />
      {/* Desktop */}
      <TimeTable showtimes={showtimesForDay} /> 
      {/* Mobile */}
      <TimeList showtimes={showtimesForDay} />
    </>
  );
};
