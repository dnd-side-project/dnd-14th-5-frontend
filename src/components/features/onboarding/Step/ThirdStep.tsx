import Image from 'next/image';

const ThirdStep = () => {
  return (
    <>
      <section className="space-y-2">
        <h2 className="text-heading-h2 text-g-0">지금 TIMO와 시작해볼까요?</h2>
        <p className="text-body-s text-g-60">
          하루 한 번, 나를 이해하는 시간.
          <br />
          TIMO와 함께 부담 없이 쌓아가보세요!
        </p>
      </section>
      <div className="flex justify-center">
        <Image
          src="/onboarding/all-character.png"
          alt="모든 캐릭터"
          width={250}
          height={250}
        />
      </div>
    </>
  );
};

export default ThirdStep;
