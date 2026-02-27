import { Suspense } from 'react';

import CharactersContent from '@/src/components/features/characters/CharactersContent/CharactersContent';
import CharactersFallback from '@/src/components/features/characters/CharactersFallback/CharactersFallback';
import CharactersHeader from '@/src/components/features/characters/CharactersHeader/CharactersHeader';

const CharacterPage = () => {
  return (
    <Suspense fallback={<CharactersFallback />}>
      <CharactersHeader />
      <CharactersContent />
    </Suspense>
  );
};

export default CharacterPage;
