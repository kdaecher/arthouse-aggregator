import { DateTime } from 'luxon';
import { Theater } from './Theater';

type Showtime = {
  day: number;
  time: string;
  movie: string;
  theater: Theater;
  link: string;
};

export default Showtime;