import { Theater } from '../types/Theater';
import Showtime from '../types/Showtime';
import getShowtimesForTheater from '../api/getShowtimesForTheater';
import groupBy from './groupBy';
import { compareTime } from './sortTimes';
import sortByDay from './sortByDay';
import dayIsThisWeek from './dayIsThisWeek';

const dayMap = {
  'today': 'Today',
  'tomorrow': 'Tomorrow',
  'sun': 'Sunday',
  'mon': 'Monday',
  'tue': 'Tuesday',
  'wed': 'Wednesday',
  'thu': 'Thursday',
  'fri': 'Friday',
  'sat': 'Saturday',
};

export default async function getShowtimesPerDay(abortSignal: AbortSignal) {
  const theaters = Object.values(Theater);

  // Fetch all showtimes
  const allShowtimes = (await Promise.all(theaters.map(theater => getShowtimesForTheater(theater, abortSignal)))).flat();

  // Group by day
  const groupedByDay: { [day: string]: Showtime[] } = groupBy(allShowtimes, 'day');

  // Sort each day by time
  Object.keys(groupedByDay).forEach(day => {
    groupedByDay[day].sort((a, b) => compareTime(a.time, b.time));
  });

  // Sort days 
  const sortedDays = Object.keys(groupedByDay).filter(dayIsThisWeek)?.sort(sortByDay);

  const result: Array<{ day: string, showtimes: Showtime[] }> = [];
  sortedDays.forEach(day => {
    result.push({
      day: dayMap[day.toLowerCase() as keyof typeof dayMap],
      showtimes: groupedByDay[day],
    });
  });

  return result;
}
