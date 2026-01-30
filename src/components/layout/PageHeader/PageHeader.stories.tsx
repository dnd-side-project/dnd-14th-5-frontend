import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PageHeader from './PageHeader';

const meta = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  args: {
    title: '기록하기',
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

const icon = <div className="h-6 w-6 rounded-full bg-[var(--color-g-400)]" />;

export const Default: Story = {
  args: {
    leftIcon: icon,
    rightIcon: icon,
  },
};
