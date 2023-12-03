import React from 'react';

import HomeBody from './components/Home';
import getData from './api/getData';

export default async function Home() {
  const data = await getData();

  return (
    <HomeBody showtimes={data} />
  );
}
