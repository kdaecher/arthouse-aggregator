import React, { PropsWithChildren } from 'react';

type Props = {
  isSelected: boolean;
  onClick: () => void;
}

export default function DayButton({ isSelected, onClick, children }: PropsWithChildren<Props>) {
  return (
    <button
      className={`p-1 border-[1.5px] border-solid rounded-md ${isSelected ? 'border-white' : 'border-black'}`}
      onClick={onClick}
    >
      {children}
    </button >
  )
}