import * as parsers from './parsers';

const map = [
  {
    url: 'https://metrograph.com/calendar',
    parser: parsers.metrograph,
  },
  {
    url: 'https://filmforum.org/now_playing',
    parser: parsers.filmForum,
  },
  {
    url: 'http://anthologyfilmarchives.org/film_screenings/calendar',
    parser: parsers.anthology,
  },
  {
    url: 'https://www.ifccenter.com/',
    parser: parsers.ifcCenter,
  },
  {
    url: 'https://www.cinemavillage.com/calendar/',
    parser: parsers.cinemaVillage,
  }
];

export default map;