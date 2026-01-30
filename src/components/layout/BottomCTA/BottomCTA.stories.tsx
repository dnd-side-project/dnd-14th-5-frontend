import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button from '@/src/components/ui/Button/Button';

import BottomCTA from './BottomCTA';

const meta = {
  title: 'Layout/BottomCTA',
  component: BottomCTA,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BottomCTA>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="w-full">
        <Button label="기록 완료" />
      </div>
    ),
  },
  render: (args) => (
    <div className="min-h-90">
      <BottomCTA>{args.children}</BottomCTA>
    </div>
  ),
};
