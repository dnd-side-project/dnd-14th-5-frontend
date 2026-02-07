import type { ComponentPropsWithoutRef } from 'react';

import type allIcons from './allIcons';

type IconNameType = keyof typeof allIcons;

interface IconProps extends Omit<
  ComponentPropsWithoutRef<'img'>,
  'src' | 'alt' | 'width' | 'height' | 'onClick'
> {
  name: IconNameType;
  size?: number;
  height?: number;
  alt?: string;
  decorative?: boolean;
  onClick?: () => void;
}

export type { IconNameType, IconProps };
