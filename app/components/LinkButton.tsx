import React, { PropsWithChildren } from 'react';

interface Props {
  onClick: () => void;
}

export default function ({ onClick, children }: PropsWithChildren<Props>) {
  return (
    <button
      onClick={onClick}
      className={`
        capitalize
        text-left
        hover:text-chartreuse
        focus:text-chartreuse
      `}
    >
      {children}
    </button>
  );
}