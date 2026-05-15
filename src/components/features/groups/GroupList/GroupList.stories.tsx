import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';

import GroupList from './GroupList';

const meta = {
  title: 'Features/Groups/GroupList',
  component: GroupList,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GroupList>;

export default meta;

type Story = StoryObj<typeof meta>;

const groups = [
  { id: '1', name: '친구 많은 모임', type: 'friend' as const, image: '' },
  { id: '2', name: '어떤 모임', type: 'friend' as const, image: '' },
  { id: '3', name: '친구 모임', type: 'friend' as const, image: '' },
  { id: '4', name: '어떤 모임', type: 'friend' as const, image: '' },
  { id: '5', name: '친구 모임', type: 'friend' as const, image: '' },
  { id: '6', name: '어떤 모임', type: 'friend' as const, image: '' },
  { id: '7', name: '친구 모임', type: 'friend' as const, image: '' },
  { id: '8', name: '어떤 모임', type: 'friend' as const, image: '' },
  { id: '9', name: '친구 모임', type: 'friend' as const, image: '' },
  { id: '10', name: '어떤 모임', type: 'friend' as const, image: '' },
];

export const Default: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState('1');
    return (
      <GroupList
        groups={groups}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
    );
  },
  args: { groups },
};
