'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import Icon from '@/src/components/ui/Icon/Icon';
import type { IconNameType } from '@/src/components/ui/Icon/Icon.types';
import { cn } from '@/src/lib/helpers/cn';

import styles from './Toast.module.css';

type ToastVariant = 'alert' | 'check';

const TOAST_VARIANT_ICON_MAP: Record<ToastVariant, IconNameType> = {
  alert: 'alert',
  check: 'checkCircle',
};

interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  dismissToast: (id: string) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

const DEFAULT_DURATION = 3000;

export const ToastContext = createContext<ToastContextValue | null>(null);

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions) => {
    const id = crypto.randomUUID();
    const duration = options.duration ?? DEFAULT_DURATION;
    const variant = options.variant ?? 'check';

    setToasts((prev) => [
      ...prev,
      {
        id,
        message: options.message,
        variant,
        duration,
      },
    ]);
  }, []);

  const value = useMemo(
    () => ({
      showToast,
      dismissToast,
    }),
    [showToast, dismissToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toast={toasts[0]} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

interface ToastViewportProps {
  toast?: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastViewport = ({ toast, onDismiss }: ToastViewportProps) => {
  if (!toast) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-4">
      <div className="mx-auto flex w-full max-w-96 justify-center">
        <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
      </div>
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard = ({ toast, onDismiss }: ToastCardProps) => {
  const [isLeaving, setIsLeaving] = useState(false);
  const exitDuration = 200;

  useEffect(() => {
    const dismissTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, toast.duration);

    const removeTimer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration + exitDuration);

    return () => {
      window.clearTimeout(dismissTimer);
      window.clearTimeout(removeTimer);
    };
  }, [toast.duration, toast.id, onDismiss, exitDuration]);

  return (
    <div
      className={cn(
        'pointer-events-auto flex min-h-9 w-fit max-w-full items-center gap-1.5 rounded-xl bg-g-0 px-3 text-g-900 shadow',
        isLeaving ? styles.toastOut : styles.toastIn,
      )}
    >
      <Icon name={TOAST_VARIANT_ICON_MAP[toast.variant]} size={24} decorative />
      <p className="font-body-s">{toast.message}</p>
    </div>
  );
};

export default ToastProvider;
