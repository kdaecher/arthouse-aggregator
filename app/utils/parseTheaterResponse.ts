import Showtime from '../types/Showtime';
import { Theater } from '../types/Theater';

type Movie = {
  'name': string;
  'link': string;
  'showing'?: Showing[];
};

type ShowtimeResponse = {
  'day': string;
  'date'?: string;
  'movies'?: Movie[];
};

type Showing = {
  'time'?: string[];
  'type'?: string;
};

const parseTheaterResponse = (theater: Theater, response: ShowtimeResponse[]): Showtime[] => {
  const result: Showtime[] = [];

  response.forEach(({ day, movies }) => {
    movies?.forEach(({ name, link, showing: showings }) => {
      showings?.forEach(showing => {
        showing?.time?.forEach(time => {
          result.push({
            movie: name,
            theater,
            time,
            day,
            link,
          });
        });

      });
    });

  });

  return result;
};

export default parseTheaterResponse;
