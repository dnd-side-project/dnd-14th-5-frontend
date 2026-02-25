import { type ChangeEvent, useEffect, useState } from 'react';

import { INSTALL_PROMPT_SEEN_KEY } from '../constants/install';

export const useInstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDontShowAgiain = (event: ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;
    const hasSeenPrompt = localStorage.getItem(INSTALL_PROMPT_SEEN_KEY);

    if (isIOS && !isStandalone && !hasSeenPrompt) {
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    if (dontShowAgain) {
      localStorage.setItem(INSTALL_PROMPT_SEEN_KEY, 'true');
    }
  };

  return {
    isVisible,
    dontShowAgain,
    handleDontShowAgiain,
    handleClose,
  };
};
