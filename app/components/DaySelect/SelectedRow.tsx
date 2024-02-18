import React from 'react';

import formatDay from '@/app/utils/formatDay';

interface Props {
  day: number;
  onClick: () => void;
}

export default function SelectedRow({ day, onClick }: Props) {
  return (
    <div
      role="option"
      tabIndex={0}
      aria-selected={true}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClick();
        }
      }}
      className={`
        flex
        flex-row
        w-full
        justify-center
        p-2
        border-b
        border-solid
        border-chartreuse
        bg-chartreuse
        cursor-pointer
      `}
    >
      {formatDay(day)}
    </div>
  );
};
