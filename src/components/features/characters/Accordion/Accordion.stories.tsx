import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Accordion from './Accordion';

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 1,
        name: '과거 긍정',
        englishName: 'PAST_POSITIVE',
        characterName: '추억하는 다람쥐',
        personality:
          '따뜻하고 정이 많으며 과거의 즐거운 기억을 소중히 여깁니다.',
        description:
          '지나간 일을 긍정적으로 기억합니다.\n소중한 사람들과의 추억을 잘 간직합니다.\n전통과 관습을 중요하게 생각합니다.',
        idealValue: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: '현재 쾌락',
        englishName: 'PRESENT_HEDONISTIC',
        characterName: '즐거운 강아지',
        personality:
          '낙천적이고 에너지가 넘치며 현재의 즐거움을 가장 중요하게 생각합니다.',
        description:
          '지금 이 순간의 행복을 추구합니다.\n새로운 경험과 도전을 즐깁니다.\n충동적이지만 열정적인 면모가 있습니다.',
        idealValue: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: '미래 지향',
        englishName: 'FUTURE',
        characterName: '계획하는 개미',
        personality:
          '책임감이 강하고 목표 지향적이며 미래를 위한 준비를 철저히 합니다.',
        description:
          '목표를 세우고 계획적으로 행동합니다.\n오늘의 보상보다 내일의 성취를 중요시합니다.\n시간 관리에 철저하고 성실합니다.',
        idealValue: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        id: 4,
        name: '과거 부정',
        englishName: 'PAST_NEGATIVE',
        characterName: '상처받은 그림자',
        personality:
          '신중하고 생각이 많으며 과거의 아픈 기억에 영향을 많이 받습니다.',
        description:
          '과거의 실수나 후회를 자주 떠올립니다.\n새로운 일을 시작할 때 걱정이 앞섭니다.\n자기 성찰 시간이 많고 신중합니다.',
        idealValue: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};
