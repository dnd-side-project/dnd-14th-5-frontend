import { useState, useSyncExternalStore } from 'react';

import { useUserDetailQuery } from '@/src/components/features/users/queries/useUserDetailQuery';

const DISMISSED_KEY = 'service_feedback_dismissed';

const subscribe = () => () => {};
const getSnapshot = () => !!localStorage.getItem(DISMISSED_KEY);
const getServerSnapshot = () => true;

export const useServiceFeedbackModal = () => {
  const { data } = useUserDetailQuery();
  const streak = data?.streakDays ?? 0;

  const dismissedInStorage = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [dismissedInSession, setDismissedInSession] = useState(false);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissedInSession(true);
  };

  return {
    show: streak === 1 && !(dismissedInStorage || dismissedInSession),
    dismiss,
  };
};
