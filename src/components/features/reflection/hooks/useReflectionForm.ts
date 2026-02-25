import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateReflectionFeedbackMutation } from '@/src/components/features/reflectionFeedback/queries/useCreateReflectionFeedbackMutation';
import { useToast } from '@/src/hooks/useToast';
import { isApiError } from '@/src/lib/api/error';

import { useSubmitReflectionMutation } from '../queries/useSubmitReflectionMutation';

interface UseReflectionFormResult {
  content: string;
  isSubmitting: boolean;
  handleContentChange: (next: string) => void;
  submit: () => Promise<void>;
}

export const useReflectionForm = (): UseReflectionFormResult => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { showToast } = useToast();

  const { mutateAsync: submitReflection, isPending: isSubmitPending } =
    useSubmitReflectionMutation();
  const {
    mutateAsync: requestCreateFeedback,
    isPending: isCreateFeedbackPending,
  } = useCreateReflectionFeedbackMutation();

  const handleContentChange = (next: string) => {
    setContent(next);
  };

  const createFeedback = async (reflectionId: number): Promise<boolean> => {
    try {
      await requestCreateFeedback({ reflectionId });
      return true;
    } catch {
      showToast({
        message: '피드백 생성에 실패했어요. 잠시 후 다시 시도해주세요.',
        variant: 'alert',
      });
      return false;
    }
  };

  const submit = async () => {
    try {
      const { id } = await submitReflection({ content: content.trim() });
      const isFeedbackCreated = await createFeedback(id);
      if (!isFeedbackCreated) {
        router.push('/');
        return;
      }

      showToast({ message: '기록이 완료되었어요.', variant: 'check' });
      router.push(`/reflection/${id}/feedback`);
    } catch (error) {
      if (isApiError(error) && error.status === 409) {
        showToast({
          message: '오늘 회고는 이미 작성했어요.',
          variant: 'alert',
        });
        router.push('/');
        return;
      }

      showToast({
        message: '기록에 실패했어요. 잠시 후 다시 시도해주세요.',
        variant: 'alert',
      });
    }
  };

  return {
    content,
    isSubmitting: isSubmitPending || isCreateFeedbackPending,
    handleContentChange,
    submit,
  };
};
