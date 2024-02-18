import React from 'react';

import Home from './components/Home';
import getData from './api/getData';

export default async function Root() {
  const data = await getData();

  return (
    <Home showtimes={data} />
  );
}
