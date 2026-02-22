'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { reflectionKeys } from '@/src/components/features/reflection/constants/queryKeys';
import { useChangeTodayQuestionMutation } from '@/src/components/features/reflection/queries/useChangeTodayQuestionMutation';
import { useTodayReflectionQuery } from '@/src/components/features/reflection/queries/useTodayReflectionQuery';
import Button from '@/src/components/ui/Button/Button';
import { useToast } from '@/src/hooks/useToast';

const HomeActionsSection = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showToast } = useToast();

  const { data: todayReflection } = useTodayReflectionQuery();

  const { mutate: changeTodayQuestion, isPending } =
    useChangeTodayQuestionMutation({
      onSuccess: (data) => {
        queryClient.setQueryData(reflectionKeys.todayQuestion(), data);
      },
      onError: () => {
        showToast({
          message: '새 질문을 가져오지 못했어요. 잠시 후 다시 시도해주세요.',
        });
      },
    });

  const handleSkip = () => {
    changeTodayQuestion();
  };

  const handleAnswer = () => {
    router.push('/reflection');
  };
  const handleViewMyAnswer = () => {
    if (!todayReflection?.id) return;
    router.push(`/reflection/${todayReflection.id}`);
  };

  if (todayReflection?.id) {
    return <Button label="나의 답변 보기" onClick={handleViewMyAnswer} />;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <Button
          label="다른 질문 받기"
          variant="secondary"
          onClick={handleSkip}
          disabled={isPending}
        />
      </div>
      <div className="flex-1">
        <Button label="답변하기" onClick={handleAnswer} />
      </div>
    </div>
  );
};

export default HomeActionsSection;
