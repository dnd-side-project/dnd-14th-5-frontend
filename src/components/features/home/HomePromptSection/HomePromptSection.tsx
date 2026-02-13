const HomePromptSection = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-s text-g-100">오늘의 회고</p>
      <div className="flex flex-col gap-1">
        <h2 className="text-heading-h2">
          오늘 하루 중 가장 재미있었던 순간은 언제였나요?
        </h2>
        <p className="text-body-s text-g-60">
          지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
        </p>
      </div>
    </div>
  );
};

export default HomePromptSection;
