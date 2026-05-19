import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import RankingItem from './RankingItem';

const meta = {
  title: 'Features/Groups/Ranking/RankingItem',
  component: RankingItem,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ul className="p-4">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof RankingItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    isExistImg: true,
    ranking: 1,
    nickname: '지민',
    answerText:
      '오늘 하루도 열심히 살았어요. 회고를 통해 많은 것을 배웠습니다.',
    streakDays: 30,
  },
};

export const WithoutImage: Story = {
  args: {
    isExistImg: false,
    ranking: 2,
    nickname: '수진',
    answerText: '새로운 목표를 세웠어요.',
    streakDays: 15,
  },
};

export const LongAnswerText: Story = {
  args: {
    isExistImg: true,
    ranking: 3,
    nickname: '현우',
    answerText:
      '오늘은 정말 긴 회고 내용을 작성했습니다. 이렇게 긴 텍스트는 말줄임표로 잘려서 표시되어야 합니다.',
    streakDays: 7,
  },
};
