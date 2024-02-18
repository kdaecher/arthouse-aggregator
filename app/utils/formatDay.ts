import { DateTime } from 'luxon';

export default function formatDay(day: number) {
  return (
    DateTime
    .fromMillis(day, ({ zone: 'America/New_York' }))
    .toFormat('cccc LLLL dd yyyy')
  );
}