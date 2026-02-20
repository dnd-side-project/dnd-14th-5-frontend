import Icon from '@/src/components/ui/Icon/Icon';

import SpeechBubble from '../SpeechBubble/SpeechBubble';

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
        <div className="relative flex justify-start">
          <Icon
            name="pinkPiece"
            size={20}
            className="absolute -top-6 left-1/4"
          />
          <div className="flex justify-between w-full">
            {/* TODO: text 토큰 중복으로 인한 크기 누락 이슈로, 크기를 별도로 지정해둔 상태. 추후 수정 필요 */}
            <SpeechBubble className="text-primary text-[0.8125rem]">
              오늘 하루 중 가장 재미있었던 순간은 언제였나요?
            </SpeechBubble>
            <Icon name="greenPiece" size={18} />
          </div>
        </div>

        <div className="relative flex justify-end">
          <Icon name="redPiece" size={15} className="absolute left-0 top-8" />
          <SpeechBubble>
            오늘 하루 중 가장 재미있었던 순간은 언제였나요?
          </SpeechBubble>
        </div>

        <div className="relative flex justify-start">
          {/* TODO: text 토큰 중복으로 인한 크기 누락 이슈로, 크기를 별도로 지정해둔 상태. 추후 수정 필요 */}
          <SpeechBubble className="text-primary text-[0.8125rem]">
            오늘 하루 중 가장 재미있었던 순간은 언제였나요?
          </SpeechBubble>

          <Icon
            name="purplePiece"
            size={10}
            className="absolute -bottom-2 right-1.5"
          />
        </div>

        <div className="relative flex justify-end">
          <SpeechBubble>
            오늘 하루 중 가장 재미있었던 순간은 언제였나요?
          </SpeechBubble>
          <Icon
            name="bluePiece"
            size={24}
            className="absolute bottom-0 left-0"
          />
        </div>

        <div className="flex justify-start">
          {/* TODO: text 토큰 중복으로 인한 크기 누락 이슈로, 크기를 별도로 지정해둔 상태. 추후 수정 필요 */}
          <SpeechBubble className="text-primary text-[0.8125rem]">
            오늘 하루 중 가장 재미있었던 순간은 언제였나요?
          </SpeechBubble>
        </div>
      </section>
    </>
  );
};

export default SecondStep;
