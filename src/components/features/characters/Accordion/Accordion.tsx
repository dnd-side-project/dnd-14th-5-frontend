'use client';

import { useState } from 'react';

import type { CharacterType } from '../queries/useTimePerspectiveCategoriesQuery';
import AccordionItem from './AccordionItem';

interface AccordionProps {
  items: CharacterType[];
}

const Accordion = ({ items }: AccordionProps) => {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((openId) => openId !== id);
      }
      return [...prev, id];
    });
  };

  return (
    <div className="w-full space-y-5">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          englishName={item.englishName}
          title={item.characterName}
          isOpen={openIds.includes(item.id)}
          onToggle={() => handleToggle(item.id)}
          personality={item.personality}
        >
          {item.description}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
