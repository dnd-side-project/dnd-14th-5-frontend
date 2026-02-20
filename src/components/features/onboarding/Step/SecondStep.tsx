import Icon from '@/src/components/ui/Icon/Icon';
import { type IconNameType } from '@/src/components/ui/Icon/Icon.types';
import { cn } from '@/src/lib/helpers/cn';

import SpeechBubble from '../SpeechBubble/SpeechBubble';

interface IconConfig {
  name: IconNameType;
  size: number;
  className: string;
}

interface BubbleData {
  id: number;
  align: 'justify-start' | 'justify-end';
  isPrimary?: boolean;
  content: string;
  icons: IconConfig[];
}

const BUBBLE_DATA: BubbleData[] = [
  {
    id: 1,
    align: 'justify-start',
    isPrimary: true,
    content: '오늘 하루 중 가장 재미있었던 순간은 언제였나요?',
    icons: [
      { name: 'pinkPiece', size: 24, className: '-top-7 left-1/4' },
      { name: 'greenPiece', size: 18, className: 'top-1.5 right-0' },
    ],
  },
  {
    id: 2,
    align: 'justify-end',
    content: '오늘 하루 중 가장 재미있었던 순간은 언제였나요?',
    icons: [{ name: 'redPiece', size: 15, className: 'left-3 top-8' }],
  },
  {
    id: 3,
    align: 'justify-start',
    isPrimary: true,
    content: '오늘 하루 중 가장 재미있었던 순간은 언제였나요?',
    icons: [
      { name: 'purplePiece', size: 10, className: '-bottom-2 right-1.5' },
    ],
  },
  {
    id: 4,
    align: 'justify-end',
    content: '오늘 하루 중 가장 재미있었던 순간은 언제였나요?',
    icons: [{ name: 'bluePiece', size: 24, className: 'bottom-0 left-0' }],
  },
  {
    id: 5,
    align: 'justify-start',
    isPrimary: true,
    content: '오늘 하루 중 가장 재미있었던 순간은 언제였나요?',
    icons: [],
  },
];

const SecondStep = () => {
  return (
    <>
      <section className="space-y-2">
        <h2 className="text-heading-h2 text-g-0">
          나만의 맞춤형 질문으로 <br />
          부담 없이 기록해보세요!
        </h2>
        <p className="text-body-s text-g-60 break-keep">
          ZTPI 시간 성향을 기반으로 매일 맞춤형 질문을 드려요.
        </p>
      </section>
      <section className="space-y-5">
        {BUBBLE_DATA.map(({ id, align, isPrimary, content, icons }) => (
          <div key={id} className={cn('relative flex w-full', align)}>
            {icons.map((icon, index) => (
              <Icon
                key={`${id}-icon-${index}`}
                name={icon.name}
                size={icon.size}
                className={cn('absolute', icon.className)}
              />
            ))}
            {/* TODO: text 토큰 중복으로 인한 크기 누락 이슈로, 크기를 별도로 지정해둔 상태. 추후 수정 필요 */}
            <SpeechBubble
              className={cn(isPrimary && 'text-primary text-[0.8125rem]')}
            >
              {content}
            </SpeechBubble>
          </div>
        ))}
      </section>
    </>
  );
};

export default SecondStep;
