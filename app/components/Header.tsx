import React from 'react';

type Props = {
  onClick: () => void;
}

export default function Header({ onClick }: Props) {
  return (
    <h1
      className="font-opera text-center text-8xl cursor-pointer"
      onClick={onClick}
    >
      Now Playing
    </h1>
  );
}