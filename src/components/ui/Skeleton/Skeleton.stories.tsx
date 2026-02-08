import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Skeleton from './Skeleton';

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  args: {
    className: 'h-6 w-40',
    ariaLabel: '스켈레톤 로딩',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
