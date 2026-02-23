import Image from 'next/image';

import { CATEGORY_CHARACTER_MAP } from '../../home/const/character';
import { type ResponseType as TestRecordResponseType } from '../queries/useTestRecordQuery';

type CharacterSummaryProps =
  TestRecordResponseType['result']['closestCategory'];

const CharacterSummary = ({
  personality,
  character,
  description,
  name,
}: CharacterSummaryProps) => {
  const { color, alt, resultSrc } = CATEGORY_CHARACTER_MAP[name];

  return (
    <>
      <section className="space-y-1 mt-10">
        <div className="text-label-n text-primary">나의 시간관</div>
        <h2 className="text-heading-h2 text-g-0 pb-3">
          당신의 캐릭터는
          <br />
          {personality}{' '}
          {/* TODO: color 상수가 text-로 바뀐 커밋이 반영되면 className으로 변경 예정 */}
          <span style={{ color: `var(--color-${color})` }}>{character}</span>
          에요!
        </h2>
        <p className="text-body-s text-g-60 break-keep">{description}</p>
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
