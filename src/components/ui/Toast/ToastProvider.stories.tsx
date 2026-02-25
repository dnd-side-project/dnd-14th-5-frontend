import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { useToast } from '@/src/hooks/useToast';

import ToastProvider from './ToastProvider';

const ToastDemo = () => {
  const { showToast } = useToast();

  return (
    <div className="flex gap-3 p-8">
      <button
        type="button"
        className="rounded-md bg-g-0 px-3 py-2 text-g-900"
        onClick={() =>
          showToast({
            message: '실패 토스트 예시입니다.',
            variant: 'alert',
          })
        }
      >
        Alert 토스트 보기
      </button>
      <button
        type="button"
        className="rounded-md bg-primary px-3 py-2 text-g-900"
        onClick={() =>
          showToast({
            message: '성공 토스트 예시입니다.',
            variant: 'check',
          })
        }
      >
        Check 토스트 보기
      </button>
    </div>
  );
};

const meta = {
  title: 'UI/Toast',
  component: ToastProvider,
  args: {
    children: null,
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};
