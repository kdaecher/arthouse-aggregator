const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default function (day: string) {
  const today = (new Date()).getDay();
  const todayString = days[today];
  const indexOfToday = days.indexOf(todayString);

  const thisWeek: string[] = [];

  let dayIndex = indexOfToday;

  for (let i = 0; i < 7; i++) {

    if (dayIndex === indexOfToday) {
      thisWeek.push('today');
    } else if (dayIndex === (indexOfToday + 1) % 7) {
      thisWeek.push('tomorrow');
    } else {
      thisWeek.push(days[dayIndex])
    }
    dayIndex = (dayIndex + 1) % 7;
  }

  return thisWeek.includes(day.toLowerCase());
}