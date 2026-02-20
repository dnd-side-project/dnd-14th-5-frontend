'use client';

import { useEffect, useState } from 'react';

const INSTALL_PROMPT_SEEN_KEY = 'installPromptSeen';

export default function InstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);

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
    localStorage.setItem(INSTALL_PROMPT_SEEN_KEY, 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-g-900/90 z-40" onClick={handleClose} />

      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-g-0 rounded-2xl shadow-2xl p-6 z-50 max-w-sm mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-b-200 rounded-2xl mx-auto mb-4 flex items-center justify-center text-heading-h1">
            📱
          </div>

          <h3 className="text-heading-h3 font-bold text-g-900 mb-2">
            앱 설치하기
          </h3>

          <p className="text-body-s text-g-200 mb-6">
            홈 화면에 추가하면 앱처럼 빠르게 사용할 수 있어요
          </p>

          <div className="bg-g-20 rounded-xl p-4 mb-4 text-left">
            <ol className="text-body-s text-g-300 space-y-2">
              <li className="flex items-start gap-2">
                <strong>1.</strong>
                <span>하단의 공유 버튼 클릭</span>
              </li>
              <li className="flex items-start gap-2">
                <strong>2.</strong>
                <span>
                  &quot;홈 화면에 추가&quot;
                  <span className="text-b-300">➕</span> 선택
                </span>
              </li>
            </ol>
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-g-40 text-g-300 font-medium py-3 px-4 rounded-xl"
          >
            나중에
          </button>
        </div>
      </div>
    </>
  );
}
