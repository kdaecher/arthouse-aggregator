import React, { useState } from 'react';

import SelectedRow from './SelectedRow';
import AccordionRows from './AccordionRows';

interface Props {
  days: number[];
  selected: number;
  onChange: (day: number) => void;
}

export default function DaySelect ({ days, selected, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const beforeSelected = days.slice(0, days.indexOf(selected));
  const afterSelected = days.slice(days.indexOf(selected) + 1);

  const onClick = (day: number) => {
    onChange(day);
    setIsOpen(false);
  }

  return (
    <div role="select">
      <AccordionRows
        rows={beforeSelected}
        onClick={onClick}
        isOpen={isOpen}
      />
      <SelectedRow
        day={selected}
        onClick={() => setIsOpen(!isOpen)}
      />
      <AccordionRows
        rows={afterSelected}
        onClick={onClick}
        isOpen={isOpen}
      />
    </div>
  );
}