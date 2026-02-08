import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Card from './Card';

const meta = {
  title: 'UI/Card',
  component: Card,
  args: {
    className: 'bg-g-400',
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <div className="text-heading-h4 text-g-0">카드 제목</div>
      <div className="text-caption-n text-g-30 opacity-50">
        카드 설명이 들어갑니다.
      </div>
    </Card>
  ),
};
