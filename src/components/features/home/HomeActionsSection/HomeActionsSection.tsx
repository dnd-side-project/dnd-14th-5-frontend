import Button from '@/src/components/ui/Button/Button';

const HomeActionsSection = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Button label="건너뛰기" variant="secondary" />
      </div>
      <div className="flex-2">
        <Button label="답변하기" />
      </div>
    </div>
  );
};

export default HomeActionsSection;
