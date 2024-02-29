'use client';
import React, { useState, useEffect } from 'react';

import Showtime from '../types/Showtime';
import DaySelect from './DaySelect';
import TimeTable from './TimeTable';
import TimeList from './TimeList';

export default function Home({ showtimes }: { showtimes: { [day: string]: Showtime[] }}) {
  const [view, setView] = useState('desktop');

  const days = Object.keys(showtimes).map(day => parseInt(day)).sort();
  const [selectedDay, setSelectedDay] = useState<number>(days[0]);
  const showtimesForDay = showtimes[selectedDay] || [];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setView('mobile');
      } else {
        setView('desktop');
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <DaySelect
        days={days}
        selected={selectedDay}
        onChange={setSelectedDay}
      />
      {view === 'desktop' ? (
        <TimeTable showtimes={showtimesForDay} />
      ) : (
        <TimeList showtimes={showtimesForDay} />
      )}
    </>
  );
};
