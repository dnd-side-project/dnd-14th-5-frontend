import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Badge from './Badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the badge.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'The visual style of the badge.',
    },
    className: {
      control: 'text',
      description: 'Additional class names to apply to the badge.',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Badge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Badge',
    variant: 'secondary',
  },
};
