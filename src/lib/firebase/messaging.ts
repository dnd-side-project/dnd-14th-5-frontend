'use client';

import { getMessaging, getToken, isSupported } from 'firebase/messaging';

import { firebaseApp } from './client';

const vapidPublicKey = process.env.NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY;
const firebaseServiceWorkerConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const getFirebaseMessagingServiceWorkerUrl = () => {
  const searchParams = new URLSearchParams();

  Object.entries(firebaseServiceWorkerConfig).forEach(([key, value]) => {
    if (!value) {
      return;
    }

    searchParams.set(key, value);
  });

  const query = searchParams.toString();

  return query
    ? `/firebase-messaging-sw.js?${query}`
    : '/firebase-messaging-sw.js';
};

// 브라우저 알림 권한을 요청합니다.
export const requestNotificationPermission = async () => {
  if (typeof window === 'undefined') {
    return 'default' as NotificationPermission;
  }

  if (typeof Notification === 'undefined') {
    return 'default' as NotificationPermission;
  }

  return Notification.requestPermission();
};

export type FcmTokenFailureReason =
  | 'SSR'
  | 'UNSUPPORTED'
  | 'MISSING_VAPID_KEY'
  | 'PERMISSION_DENIED'
  | 'TOKEN_UNAVAILABLE'
  | 'SW_OR_TOKEN_ERROR';

interface FcmTokenResult {
  token: string | null;
  reason: FcmTokenFailureReason | null;
}

// FCM 토큰을 발급합니다. 실패 시 원인 코드를 함께 반환합니다.
export const getFcmToken = async (): Promise<FcmTokenResult> => {
  if (typeof window === 'undefined') {
    return { token: null, reason: 'SSR' };
  }

  const supported = await isSupported();

  if (!supported) {
    return { token: null, reason: 'UNSUPPORTED' };
  }

  if (!vapidPublicKey) {
    console.error('NEXT_PUBLIC_WEB_PUSH_VAPID_PUBLIC_KEY is not set.');
    return { token: null, reason: 'MISSING_VAPID_KEY' };
  }

  const permission = await requestNotificationPermission();

  if (permission !== 'granted') {
    return { token: null, reason: 'PERMISSION_DENIED' };
  }

  // 루트 스코프 서비스워커 등록 후 해당 registration을 사용해 토큰을 발급합니다.
  try {
    const serviceWorkerRegistration = await navigator.serviceWorker.register(
      getFirebaseMessagingServiceWorkerUrl(),
    );
    // Firebase 앱 인스턴스로 웹 메시징 객체를 생성합니다.
    const messaging = getMessaging(firebaseApp);

    const token = await getToken(messaging, {
      vapidKey: vapidPublicKey,
      serviceWorkerRegistration,
    });
    if (!token) {
      return { token: null, reason: 'TOKEN_UNAVAILABLE' };
    }

    return { token, reason: null };
  } catch {
    return { token: null, reason: 'SW_OR_TOKEN_ERROR' };
  }
};
