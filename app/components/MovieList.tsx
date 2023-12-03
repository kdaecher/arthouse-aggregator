import React from 'react';

import MovieBlock from './MovieBlock';
import Showtime from '../types/Showtime';

export default function MovieList({ movies }: { movies: Record<string, Showtime[]>}) {
  return (
    <div className="divide-y divide-dashed divide-black overflow-scroll">
      {Object.keys(movies).map(movie => (
        <MovieBlock
          key={movie}
          movie={movie}
          showtimes={movies[movie]}
        />
      ))}
    </div>
  );
};
