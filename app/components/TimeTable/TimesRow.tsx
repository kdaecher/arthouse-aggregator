import React from 'react';

export default function TimesRow({ times }: { times: string[] }) {
  return (
    <div
      className={`
        grid
        grid-cols-subgrid
        col-span-full
        border-b
        border-solid
        border-chartreuse
        text-lg
        self-start
        top-0 sticky
        bg-newspaper
        bg-opacity-1
      `}
    >
      {times.map((time, index) => 
        <div
          key={time}
          className={index === 0 ? 'col-start-2' : ''}
        >
          {time}
        </div>
      )}
    </div>
  );
}
