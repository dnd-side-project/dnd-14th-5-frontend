import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const goBackOrHome = (router: AppRouterInstance) => {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back();
    return;
  }
  router.push('/');
};

export const goToHome = (router: AppRouterInstance) => {
  router.push('/');
};
