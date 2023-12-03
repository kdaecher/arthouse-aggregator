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
];

export default map;