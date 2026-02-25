import Image from 'next/image';

import type { IntroductionType } from '../queries/useIntroductionsQuery';

type IntroductionStepProps = Pick<
  IntroductionType,
  'title' | 'description' | 'imageUrl'
>;

const IntroductionStep = ({
  title,
  description,
  imageUrl,
}: IntroductionStepProps) => {
  return (
    <article>
      <section className="space-y-2 py-25">
        <h2 className="text-heading-h2 text-g-0">{title}</h2>
        <p className="text-body-s text-g-60 break-keep">{description}</p>
      </section>
      <div className="flex justify-center">
        <Image src={imageUrl} alt="캐릭터" width={250} height={250} />
      </div>
    </article>
  );
};

export default IntroductionStep;
