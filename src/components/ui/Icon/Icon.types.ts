import type { ComponentPropsWithoutRef } from 'react';

import type allIcons from './allIcons';

type IconNameType = keyof typeof allIcons;

interface IconProps extends Omit<
  ComponentPropsWithoutRef<'img'>,
  'src' | 'alt' | 'width' | 'height'
> {
  name: IconNameType;
  size?: number;
  height?: number;
  alt?: string;
  decorative?: boolean;
}

type IconStyleProps = Pick<IconProps, 'size' | 'height'>;

export type { IconNameType, IconProps, IconStyleProps };
