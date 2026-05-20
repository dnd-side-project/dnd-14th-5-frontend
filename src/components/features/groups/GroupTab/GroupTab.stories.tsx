import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import type { GroupType } from '../constants/groupType';
import GroupTab from './GroupTab';

const meta = {
  title: 'Features/Groups/GroupTab',
  component: GroupTab,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GroupTab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState<GroupType>('FRIEND');
    return <GroupTab activeTab={activeTab} onTabChange={setActiveTab} />;
  },
  args: { activeTab: 'FRIEND' as const, onTabChange: () => {} },
};
