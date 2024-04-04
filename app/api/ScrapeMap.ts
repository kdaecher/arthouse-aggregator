import Theater from '../types/Theater';
import * as parsers from './parsers';

const map = [
  {
    theater: Theater.METROGRAPH,
    url: 'https://metrograph.com/calendar',
    parser: parsers.metrograph,
  },
  {
    theater: Theater.FILM_FORUM,
    url: 'https://filmforum.org/now_playing',
    parser: parsers.filmForum,
  },
  {
    theater: Theater.ANTHOLOGY_FILM_ARCHIVES,
    url: 'http://anthologyfilmarchives.org/film_screenings/calendar',
    parser: parsers.anthology,
  },
  {
    theater: Theater.IFC_CENTER,
    url: 'https://www.ifccenter.com/',
    parser: parsers.ifcCenter,
  },
  {
    theater: Theater.CINEMA_VILLAGE,
    url: 'https://www.cinemavillage.com/calendar/',
    parser: parsers.cinemaVillage,
  },
  {
    theater: Theater.QUAD_CINEMA,
    url: 'https://quadcinema.com/all',
    parser: parsers.quadCinema,
  },
];

export default map;