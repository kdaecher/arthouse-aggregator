import React from 'react';
import Showtime from '../types/Showtime';

import { Theater } from '../types/Theater';
import Links from '../constants/TheaterLinks';

type Props = {
  time: string,
  movie: string,
  theater: Theater,
  link: string;
};

export default function Showtime({ time, movie, theater, link }: Props) {

  return (
    <div className="grid grid-cols-6 w-full p-2 snap-start">
      <span className="col-span-1">{time}</span>
      <a href={link} target="_blank" className="hover:font-medium col-span-3">{movie}</a>
      <a href={Links[theater]} target="_blank" className="hover:font-medium col-span-2">{`${theater}`}</a>
    </div >
  );
}