import React, { useState } from 'react';

import Showtime from '@/app/types/Showtime';
import LinkButton from '../LinkButton';

interface Props {
  time: string;
  showtimes: Showtime[];
}

export default function TimeAccordion({ time, showtimes }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`
        border-b
        border-solid
        border-chartreuse
        p-3
    `}
    >
      <div
        key={time}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          text-5xl
          text-chartreuse
          font-extralight
          cursor-pointer
        `}
      >
        {time}
      </div>
      <div
        className={`
          grid
          grid-rows-[0fr]
          transition-[grid-template-rows]
          duration-500
          ${isOpen  && 'grid-rows-[1fr]'}
        `}
      >
        <div
          className={`
            flex
            flex-col
            overflow-hidden
          `}
        >
          {showtimes?.map(({ theater, movie, link }) => (
            <LinkButton
              key={`${theater}-${movie}-${time}`}
              onClick={() => window.open(link)}
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
          ))}
        </div>  
      </div>
    </div>
  );
}

