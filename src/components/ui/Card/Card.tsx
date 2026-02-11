import type { PropsWithChildren } from 'react';

import { cn } from '@/src/lib/helpers/cn';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card = ({ className, children }: CardProps) => {
  return <div className={cn('rounded-lg p-4', className)}>{children}</div>;
};

export default Card;
