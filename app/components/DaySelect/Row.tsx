import React from 'react';

import formatDay from '@/app/utils/formatDay';

interface Props {
  day: number;
  onClick: () => void;
  isVisible: boolean;
  tabIndex?: number;
}

export default function Row ({ day, onClick, isVisible }: Props) {
  return (
    <div
      role="option"
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      aria-selected={false}
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
        cursor-pointer
        ${isVisible ? 'hover:bg-chartreuse focus:bg-chartreuse' : ''}
      `}
    >
      {formatDay(day)}
    </div>
  );
}
