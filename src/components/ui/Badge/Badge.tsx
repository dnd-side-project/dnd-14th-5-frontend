import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/src/lib/helpers/cn';

const badgeVariants = cva('inline-flex items-center rounded-full', {
  variants: {
    variant: {
      primary: 'bg-primary text-g-900 text-button-s px-4 py-2',
      secondary: 'bg-g-0 text-black text-caption-n px-7 py-1',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

const Badge = ({ children, variant, className, ...props }: BadgeProps) => {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props}>
      {children}
    </span>
  );
};

export default Badge;
