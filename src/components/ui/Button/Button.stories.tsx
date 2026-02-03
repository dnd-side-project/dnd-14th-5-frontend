import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  args: {
    label: '기록 완료',
    variant: 'primary',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    label: '보조 버튼',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성',
    disabled: true,
  },
};
