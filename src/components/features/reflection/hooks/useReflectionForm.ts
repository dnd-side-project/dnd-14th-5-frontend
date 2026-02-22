import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useToast } from '@/src/hooks/useToast';

import {
  type SubmitReflectionResponseType,
  useSubmitReflectionMutation,
} from '../queries/useSubmitReflectionMutation';

interface UseReflectionFormResult {
  content: string;
  isSubmitting: boolean;
  handleContentChange: (next: string) => void;
  submit: () => void;
}

export const useReflectionForm = (): UseReflectionFormResult => {
  const router = useRouter();
  const { showToast } = useToast();
  const handleSuccess = ({ id }: SubmitReflectionResponseType) => {
    showToast({ message: '기록이 완료되었어요.', variant: 'check' });
    router.push(`/reflections/${id}/feedback`);
  };
  const { mutate: submitReflection, isPending } = useSubmitReflectionMutation({
    onSuccess: handleSuccess,
    onError: () => {
      showToast({
        message: '기록에 실패했어요. 잠시 후 다시 시도해주세요.',
        variant: 'alert',
      });
    },
  });
  const [content, setContent] = useState('');

  const handleContentChange = (next: string) => {
    setContent(next);
  };

  const submit = () => {
    submitReflection({ content: content.trim() });
  };

  return {
    content,
    isSubmitting: isPending,
    handleContentChange,
    submit,
  };
};
