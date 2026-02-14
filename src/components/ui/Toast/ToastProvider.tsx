'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/src/lib/helpers/cn';

import styles from './Toast.module.css';

interface ToastOptions {
  message: string;
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

    setToasts((prev) => [
      ...prev,
      {
        id,
        message: options.message,
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
      <div className="mx-auto w-full max-w-96">
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
        'pointer-events-auto flex items-center justify-between gap-3 rounded-2xl bg-g-600 px-4 py-3 shadow text-g-0',
        isLeaving ? styles.toastOut : styles.toastIn,
      )}
    >
      <p className="text-body-s">{toast.message}</p>
    </div>
  );
};

export default ToastProvider;
