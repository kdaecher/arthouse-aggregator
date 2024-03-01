import React from 'react';

import Home from './components/Home';

export default async function Root() {
  const res = await import('./api/scrape/route');
  const data =  await (await res.GET()).json();
  
  return (
    <Home showtimes={data} />
  );
}
