import { cn } from '@/src/lib/helpers/cn';

interface SpeechBubbleProps {
  children: string;
  className?: string;
}

const SpeechBubble = ({ children, className }: SpeechBubbleProps) => {
  return (
    <span className={cn('bg-g-400 p-4 rounded-xl text-caption-n', className)}>
      {children}
    </span>
  );
};

export default SpeechBubble;
