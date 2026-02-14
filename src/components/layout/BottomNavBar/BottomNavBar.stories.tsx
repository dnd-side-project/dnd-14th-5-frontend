import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import BottomNavBar from './BottomNavBar';

const meta = {
  title: 'Layout/BottomNavBar',
  component: BottomNavBar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof BottomNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-dvh bg-g-700">
      <BottomNavBar />
    </div>
  ),
};
