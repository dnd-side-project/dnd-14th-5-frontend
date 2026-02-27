'use client';

import Accordion from '@/src/components/ui/Accordion/Accordion';

import { useTimePerspectiveCategories } from '../queries/useTimePerspectiveCategoriesQuery';

const CharactersContent = () => {
  const { data } = useTimePerspectiveCategories();

  return (
    <div className="my-8 pb-8">
      <Accordion items={data} />
    </div>
  );
};

export default CharactersContent;
