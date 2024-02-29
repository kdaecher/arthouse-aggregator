import React, { useState } from 'react';

import Accordion from '../Accordion';
import SelectedRow from './SelectedRow';
import Row from './Row';

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
      <Accordion isOpen={isOpen}>
        {beforeSelected.map(day => 
          <Row
            key={day}
            day={day}
            onClick={() => onClick(day)}
            isVisible={isOpen}
          />
        )}
      </Accordion>
      <SelectedRow
        day={selected}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Accordion isOpen={isOpen}>
        {afterSelected.map(day => 
          <Row
            key={day}
            day={day}
            onClick={() => onClick(day)}
            isVisible={isOpen}
          />
        )}
      </Accordion>
    </div>
  );
}