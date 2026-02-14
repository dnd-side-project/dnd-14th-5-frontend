import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ErrorState from './ErrorState';

const meta = {
  title: 'UI/ErrorState',
  component: ErrorState,
  args: {
    title: '문제가 발생했어요.',
    description: '잠시 후 다시 시도해주세요.',
    retryLabel: '다시 시도',
  },
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center justify-center p-8">
      <ErrorState {...args} onRetry={() => undefined} />
    </div>
  ),
};
