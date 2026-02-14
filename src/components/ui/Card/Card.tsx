import type { ReactNode } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={cn('rounded-lg p-4', className)}>{children}</div>;
};

export default Card;
