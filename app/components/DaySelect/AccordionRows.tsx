import React from 'react';

import Row from './Row';

interface Props {
  isOpen: boolean;
  rows: number[];
  onClick: (day: number) => void;
}

export default function AccordionRows({ isOpen, rows, onClick }: Props) {
  return (
    <div
        className={`
          grid
          grid-rows-[0fr]
          transition-[grid-template-rows]
          duration-500
          ${isOpen  && 'grid-rows-[1fr]'}
        `}
      >
        <div className="overflow-hidden">
          {rows.map(day => 
            <Row
              key={day}
              day={day}
              onClick={() => onClick(day)}
              isVisible={isOpen}
            />
          )}
        </div>
      </div>
  );
}
