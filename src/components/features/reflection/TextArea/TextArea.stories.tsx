import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import TextArea from './TextArea';

const meta = {
  title: 'Features/Reflection/TextArea',
  component: TextArea,
  args: {
    placeholder: '어떤 일이 있었나요?',
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-110">
      <TextArea {...args} />
    </div>
  ),
};

export const LimitedLength: Story = {
  args: {
    maxLength: 120,
  },
  render: (args) => (
    <div className="max-w-110">
      <TextArea {...args} />
    </div>
  ),
};
