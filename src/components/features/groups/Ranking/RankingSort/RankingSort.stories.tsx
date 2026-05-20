import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SORT_OPTIONS } from '../../constants/groupSort';
import RankingSort from './RankingSort';

const meta = {
  title: 'Features/Groups/Ranking/RankingSort',
  component: RankingSort,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RankingSort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: SORT_OPTIONS,
    value: SORT_OPTIONS[0].value,
  },
};
