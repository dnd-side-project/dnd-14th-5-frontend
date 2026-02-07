import Image from 'next/image';

import { cn } from '@/src/lib/helpers/cn';

import allIcons from './allIcons';
import type { IconProps } from './Icon.types';

const Icon = ({
  name,
  size = 14,
  height,
  alt,
  decorative = false,
  className,
  onClick,
  ...rest
}: IconProps) => {
  const src = allIcons[name];

  if (!src) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`등록되지 않은 아이콘: ${name}`);
    }
    return null;
  }

  const resolvedAlt = decorative ? '' : (alt ?? name);

  const resolvedSize = height ?? size;
  const iconStyle = { width: size, height: resolvedSize };

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      aria-hidden={decorative || resolvedAlt.length === 0 ? true : undefined}
      onClick={onClick}
      width={size}
      height={resolvedSize}
      className={cn(
        'inline-block shrink-0',
        onClick && 'cursor-pointer',
        className,
      )}
      style={iconStyle}
      unoptimized
      {...rest}
    />
  );
};

export default Icon;
