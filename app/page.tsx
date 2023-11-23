'use client'
import React from 'react';

import SiteTitle from './components/SiteTitle';
import Body from './components/Body';

export default function Home() {
  return (
    <div className="grid grid-cols-12 grid-rows-[10%_90%] w-full h-full">
      <div className="col-start-2 col-span-2 row-start-2">
        <SiteTitle />
      </div>
      <div className="col-start-5 col-span-6 row-start-2">
        <Body />
      </div>
    </div>
  );
}
