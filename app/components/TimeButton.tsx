import React from 'react';

type Props = {
  time: string;
  link: string;
}

export default function TimeButton({ link, time }: Props) {

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        window.open(link);
      }}
      className="border-[0.5px] border-black p-1 text-s hover:text-white hover:bg-black focus-visible:text-white focus-visible:bg-black"
    >
      {time}
    </button>
  );
}