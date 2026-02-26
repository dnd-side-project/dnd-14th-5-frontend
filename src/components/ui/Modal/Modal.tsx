'use client';

import { type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '@/src/lib/helpers/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
  contentClassName?: string;
  overlayClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  showCloseButton = false,
  contentClassName,
  overlayClassName,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen || typeof window === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className={cn('absolute inset-0 bg-g-900/80', overlayClassName)}
      />

      <div className="relative mx-auto w-full max-w-110 px-7.5">
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            'relative z-10 w-full rounded-3xl bg-g-400 p-6',
            contentClassName,
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              aria-label="닫기"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-body-s text-g-0"
            >
              X
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
