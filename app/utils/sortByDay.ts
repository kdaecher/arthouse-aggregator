
const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function sortByDay(day1: string, day2: string) {
  const today = (new Date()).getDay();
  const todayString = days[today];
  const indexOfToday = days.indexOf(todayString);

  const sorter: { [day: string]: number } = {};

  let dayIndex = indexOfToday;

  for (let i = 0; i < 7; i++) {

    if (dayIndex === indexOfToday) {
      sorter['today'] = i;
    } else if (dayIndex === (indexOfToday + 1) % 7) {
      sorter['tomorrow'] = i;
    } else {
      sorter[days[dayIndex]] = i;
    }
    dayIndex = (dayIndex + 1) % 7;
  }

  return sorter[day1.toLowerCase()] - sorter[day2.toLowerCase()];
}
