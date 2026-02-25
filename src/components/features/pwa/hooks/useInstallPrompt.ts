import { type ChangeEvent, useEffect, useState } from 'react';

import {
  IN_APP_BROWSER_REGEX,
  INSTALL_PROMPT_SEEN_KEY,
} from '../constants/install';

export const useInstallPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleDontShowAgain = (event: ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia(
      '(display-mode: standalone)',
    ).matches;
    const hasSeenPrompt = localStorage.getItem(INSTALL_PROMPT_SEEN_KEY);

    let timer: ReturnType<typeof setTimeout>;

    if (isIOS && !isStandalone && !hasSeenPrompt) {
      timer = setTimeout(() => setIsVisible(true), 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const isInAppBrowser =
    typeof navigator !== 'undefined' &&
    IN_APP_BROWSER_REGEX.test(navigator.userAgent);

  const handleClose = () => {
    setIsVisible(false);

    if (dontShowAgain) {
      localStorage.setItem(INSTALL_PROMPT_SEEN_KEY, 'true');
    }
  };

  return {
    isVisible,
    dontShowAgain,
    handleDontShowAgain,
    isInAppBrowser,
    handleClose,
  };
};
