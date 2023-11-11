import { Theater } from '../types/Theater';
import parseTheaterResponse from '../utils/parseTheaterResponse';

import filmForumResponse from './mocks/filmForumResponse.json';
import metrographResponse from './mocks/metrographResponse.json';

const mockMap: Partial<Record<Theater, object>> = {
  [Theater.FILM_FORUM]: filmForumResponse,
  [Theater.METROGRAPH]: metrographResponse,
};

const DEV_MODE = false;

export default async function getShowtimesForTheater(theater: Theater, abortSignal: AbortSignal) {
  let data;

  if (DEV_MODE) {
    data = mockMap[theater];
  } else {
    const response = await fetch(`/api/serp?theater=${theater}`, {
      method: 'POST',
      signal: abortSignal,
    });
    data  = await response.json();
  }

  try {
    const showtimes = data['showtimes'];
    const parsedResponse = parseTheaterResponse(theater, showtimes);

    return parsedResponse;

  } catch (e) {
    console.error(`Error parsing ${theater}: ${e}`);
    return []
  }

}
