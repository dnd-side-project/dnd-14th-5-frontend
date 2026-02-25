'use client';

import { INSTALL_DESCRIPTION } from '../constants/install';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import Description from './Description';

export default function InstallPrompt() {
  const {
    isVisible,
    dontShowAgain,
    handleDontShowAgiain,
    isInAppBrowser,
    handleClose,
  } = useInstallPrompt();

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-g-600 rounded-xl p-6 z-50 max-w-sm mx-auto">
        <div className="text-center">
          <div className="w-20 h-20 bg-b-300/20 border border-b-300/30 rounded-xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-inner">
            📱
          </div>

          <h3 className="text-heading-h3 font-bold text-g-0 mb-2">
            앱 설치하기
          </h3>
          <p className="text-body-s text-g-80 mb-8">
            홈 화면에 추가하면 앱처럼 빠르게 사용할 수 있어요.
          </p>

          <div className="bg-g-300/80 rounded-xl p-5 mb-6 text-left">
            {isInAppBrowser ? (
              <div className="text-body-s text-g-40 text-center space-y-5">
                <p>
                  현재 브라우저에서는
                  <br /> 앱 설치가 지원되지 않아요. 😢
                </p>
                <p>
                  크롬 혹은 사파리로 열고 <br />
                  <strong>홈 화면에 추가</strong>를 선택해주세요!
                </p>
              </div>
            ) : (
              <ol className="text-body-s text-g-40 space-y-4">
                {INSTALL_DESCRIPTION.map((item) => (
                  <Description key={item.id} id={item.id}>
                    {item.content}
                  </Description>
                ))}
              </ol>
            )}
          </div>

          <button
            onClick={handleClose}
            className="w-full bg-g-400 transition-all text-g-0 py-4 px-4 rounded-xl mb-4"
          >
            나중에
          </button>

          <div className="flex items-center justify-start gap-2 py-2">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={handleDontShowAgiain}
              className="rounded-md border-2 border-g-300cursor-pointer"
            />
            <label
              htmlFor="dontShowAgain"
              className="text-body-s text-g-80 cursor-pointer select-none"
            >
              다시 보지 않기
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
