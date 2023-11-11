/* Adapted from: https://www.w3schools.com/howto/howto_css_loader.asp */

import React from 'react';

import './styles.css';

export default function Loader() {
  return (
    <div className="h-full w-full flex items-center justify-center absolute">
      <div className="h-24 w-24 loader"></div>
    </div>
  )
}
