import { useState } from 'react';

import { useSubmitReflectionMutation } from '../queries/useSubmitReflectionMutation';

interface UseReflectionFormResult {
  content: string;
  isSubmitting: boolean;
  handleContentChange: (next: string) => void;
  submit: () => void;
}

export const useReflectionForm = (): UseReflectionFormResult => {
  const { mutate: submitReflection, isPending } = useSubmitReflectionMutation();
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
