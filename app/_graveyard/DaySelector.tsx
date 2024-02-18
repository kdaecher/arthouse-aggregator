import React from 'react';
import { DateTime } from 'luxon';

type Props = {
  days?: number[];
  onChange: (day: number) => void;
};

const formatDay = (day: number) => (
  DateTime
    .fromMillis(day, ({ zone: 'America/New_York' }))
    .toLocaleString(DateTime.DATE_HUGE)
);

export default function DaySelector({ days, onChange }: Props) {
  return (
    <div className="flex flex-row border-b border-solid border-black pb-4">
      <div className="font-inria italic text-xl mr-4">
        Movies playing
      </div>
      {days && (
        <select onChange={e => onChange(parseInt(e.target.value))}>
          {days.map((day) => (
            <option
              key={day}
              value={day}
            >
              {formatDay(day)}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
