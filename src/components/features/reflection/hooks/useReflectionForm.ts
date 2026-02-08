import { useState } from 'react';

import { useSubmitReflectionMutation } from '../queries/useSubmitReflectionMutation';

interface UseReflectionFormResult {
  content: string;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
  setContent: (next: string) => void;
  handleSubmit: () => void;
}

export const useReflectionForm = (
  isQuestionReady: boolean,
): UseReflectionFormResult => {
  const { mutate: submitReflection, isPending } = useSubmitReflectionMutation();
  const [content, setContent] = useState('');

  const isSubmitDisabled =
    !isQuestionReady || content.trim().length === 0 || isPending;

  const handleSubmit = () => {
    if (isSubmitDisabled) return;
    submitReflection({ content: content.trim() });
  };

  return {
    content,
    isSubmitting: isPending,
    isSubmitDisabled,
    setContent,
    handleSubmit,
  };
};
