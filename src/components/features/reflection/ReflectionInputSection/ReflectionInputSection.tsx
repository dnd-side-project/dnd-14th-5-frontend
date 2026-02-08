import TextArea from '@/src/components/features/reflection/TextArea/TextArea';

type ReflectionInputSectionProps = {
  value: string;
  disabled: boolean;
  onChange: (next: string) => void;
};

const ReflectionInputSection = ({
  value,
  disabled,
  onChange,
}: ReflectionInputSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <p className="px-2 text-heading-h4 text-g-0">오늘 나의 생각은?</p>
      <TextArea
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </section>
  );
};

export default ReflectionInputSection;
