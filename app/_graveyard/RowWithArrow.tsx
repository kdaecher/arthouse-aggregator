import React from 'react';

import formatDay from '@/app/utils/formatDay';

const Arrow = ({ rotate }: { rotate: boolean}) => (
  <div className={`w-0 h-0 border-solid border-x-[10px] border-t-[17.32px] border-x-transparent border-t-chartreuse transition-transform ${rotate && 'rotate-180'}`} />
);

const RowWithArrow = ({
  day,
  isOpen,
  onClick,
}: {
  day: number;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-[1fr_repeat(1,_auto)_1fr] justify-items-center cursor-pointer border-b border-solid border-chartreuse ${isOpen ? 'bg-chartreuse' : 'bg-newspaper'}`}
    >
      <div className={`col-start-2 flex items-center`}>
        {formatDay(day)}
      </div>
      <button className={`ml-auto p-2  border-solid ${isOpen ? 'border-newspaper' : 'border-chartreuse' }`}>
        <Arrow rotate={isOpen} />
      </button>
    </div>
  );
};

export default RowWithArrow