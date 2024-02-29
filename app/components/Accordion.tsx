import React, { PropsWithChildren } from 'react';

interface Props {
  isOpen: boolean;
  header?: JSX.Element;
  onClick?: () => void;
}

export default function Accordion({
  header,
  isOpen,
  onClick,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div onClick={onClick}>
      {header}
      <div
        className={`
          grid
          grid-rows-[0fr]
          transition-[grid-template-rows]
          duration-500
          ${isOpen  && 'grid-rows-[1fr]'}
        `}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
