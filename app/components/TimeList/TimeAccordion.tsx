import React from 'react';

import Showtime from '@/app/types/Showtime';
import LinkButton from '../LinkButton';
import Accordion from '../Accordion';

interface Props {
  time: string;
  showtimes: Showtime[];
  isOpen: boolean;
  onClick: () => void;
}

export default function TimeAccordion({ time, showtimes, isOpen, onClick }: Props) {

  return (
    <div
      className={`
        border-b
        border-solid
        border-chartreuse
        p-3
    `}
    >
      <Accordion
        isOpen={isOpen}
        onClick={onClick}
        header={(
          <p
            className={`
              text-5xl
              font-extralight
              cursor-pointer
              // TODO: transition text color
              ${isOpen && 'text-chartreuse'}
            `}
          >
            {time}
          </p>
        )}
      >
        <div
          className={`
            flex
            flex-col
          `}
        >
          {showtimes?.map(({ theater, movie, link }) => (
            <div
              key={`${theater}-${movie}-${time}`}
              className="pt-2 pl-1"
            >
              <LinkButton
                onClick={(e) => {
                  e?.stopPropagation();
                  window.open(link);
                }}
              >
                {movie}
                <p
                  className={`
                    uppercase
                    text-xs
                  `}
                >
                  {theater}
                </p>
              </LinkButton>
            </div>
          ))}
        </div>  
      </Accordion>
    </div>
  );
}

