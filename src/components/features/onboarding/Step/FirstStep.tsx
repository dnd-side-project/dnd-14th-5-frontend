import Image from 'next/image';

const FirstStep = () => {
  return (
    <>
      <section className="space-y-2">
        <h2 className="text-heading-h2 text-g-0">
          당신의 회고, <br />왜 늘 오래가지 못했을까요?
        </h2>
        <p className="text-body-s text-g-60 break-keep">
          무엇을 써야 할지 몰라서, 시간이 오래 걸릴 것 같아서 실천을 망설이지
          않으셨나요?
        </p>
      </section>
      <div className="flex justify-center">
        <Image
          src="/onboarding/frustration.png"
          alt="좌절하는 캐릭터"
          width={250}
          height={250}
        />
      </div>
    </>
  );
};

export default FirstStep;
