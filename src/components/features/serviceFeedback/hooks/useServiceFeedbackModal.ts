import { useState } from 'react';

import { useUserDetailQuery } from '@/src/components/features/users/queries/useUserDetailQuery';

const DISMISSED_KEY = 'service_feedback_dismissed';

export const useServiceFeedbackModal = () => {
  const { data } = useUserDetailQuery();
  const streak = data?.streakDays ?? 0;

  const [isDismissed, setIsDismissed] = useState(
    () => !!localStorage.getItem(DISMISSED_KEY),
  );

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setIsDismissed(true);
  };

  return {
    show: streak === 1 && !isDismissed,
    dismiss,
  };
};
