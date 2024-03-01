import React from 'react';

import Home from './components/Home';

export default async function Root() {
  const data = await fetch('/api/scrape').then(res => res.json());

  return (
    <Home showtimes={data} />
  );
}
