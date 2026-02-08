import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card = ({ className, children }: CardProps) => {
  return <div className={`rounded-lg p-4 ${className ?? ''}`}>{children}</div>;
};

export default Card;
