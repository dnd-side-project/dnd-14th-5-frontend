import Icon from '@/src/components/ui/Icon/Icon';

interface QuestionRowProps {
  text: string;
}

const QuestionRow = ({ text }: QuestionRowProps) => (
  <div className="flex items-start justify-between gap-4">
    <p className="text-left font-body-m text-g-0">{text}</p>
    <Icon name="chevronLeft" size={24} className="pt-1 rotate-180" />
  </div>
);

export default QuestionRow;
