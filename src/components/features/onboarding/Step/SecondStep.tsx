import Image from 'next/image';

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
      <div className="flex justify-center">
        <Image
          src="/onboarding/character-bubble.png"
          alt="매일 질문 제공"
          width={250}
          height={250}
        />
      </div>
    </>
  );
};

export default SecondStep;
