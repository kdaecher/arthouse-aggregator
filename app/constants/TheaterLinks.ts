import { Theater } from '../types/Theater'

const Links: Record<Theater, string> = {
  [Theater.ANGELIKA]: 'https://www.angelikafilmcenter.com/nyc/showtimes-and-tickets/now-playing',
  [Theater.FILM_FORUM]: 'https://filmforum.org/now_playing',
  [Theater.IFC_CENTER]: 'https://www.ifccenter.com',
  [Theater.LINCOLN_CENTER]: 'https://www.filmlinc.org/now-playing',
  [Theater.METROGRAPH]: 'https://metrograph.com/nyc',
  [Theater.PARIS_THEATER]: 'https://www.paristheaternyc.com/films',
  [Theater.QUAD_CINEMA]: 'https://quadcinema.com',
  // [Theater.ROXY_CINEMA]: 'https://www.roxycinemanewyork.com/now-showing',
  [Theater.VILLAGE_EAST]: 'https://www.angelikafilmcenter.com/villageeast/showtimes-and-tickets/now-playing',
};

export default Links;
