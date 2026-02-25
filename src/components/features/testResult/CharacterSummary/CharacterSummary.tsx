import Image from 'next/image';

import { CATEGORY_CHARACTER_MAP } from '@/src/lib/constants/character';

import { type ResponseType as TestRecordResponseType } from '../queries/useTestRecordQuery';

type CharacterSummaryProps = Pick<
  TestRecordResponseType['result'],
  'closestCategory'
>;

const CharacterSummary = ({ closestCategory }: CharacterSummaryProps) => {
  const { name, description, character, personality } = closestCategory;
  const { color, alt, resultSrc } = CATEGORY_CHARACTER_MAP[name];

  return (
    <>
      <section className="space-y-1 mt-10">
        <div className="font-label-n text-primary">나의 시간관</div>
        <h2 className="font-heading-h2 text-g-0 pb-3">
          당신의 캐릭터는
          <br />
          {personality} <span className={color}>{character}</span>
          에요!
        </h2>
        <p className="font-body-s text-g-60 break-keep">{description}</p>
      </section>

      <Image
        src={resultSrc}
        alt={alt}
        width={400}
        height={400}
        className="py-3"
      />
    </>
  );
};

export default CharacterSummary;
