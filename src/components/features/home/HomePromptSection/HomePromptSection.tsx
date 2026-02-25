interface HomePromptSectionProps {
  todayQuestion?: string;
}

const HomePromptSection = ({ todayQuestion }: HomePromptSectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-body-s text-g-100">오늘의 회고</p>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading-h2">{todayQuestion}</h2>
        <p className="font-body-s text-g-60">
          지금 떠오르는 감정이나 생각을 부담없이 작성해보세요!
        </p>
      </div>
    </div>
  );
};

export default HomePromptSection;
