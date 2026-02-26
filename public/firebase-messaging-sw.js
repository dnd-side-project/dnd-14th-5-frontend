/* global firebase */

importScripts(
  'https://www.gstatic.com/firebasejs/12.9.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/12.9.0/firebase-messaging-compat.js',
);

const searchParams = new URL(self.location.href).searchParams;
const firebaseConfig = {
  apiKey: searchParams.get('apiKey'),
  authDomain: searchParams.get('authDomain'),
  projectId: searchParams.get('projectId'),
  storageBucket: searchParams.get('storageBucket'),
  messagingSenderId: searchParams.get('messagingSenderId'),
  appId: searchParams.get('appId'),
};

if (
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId
) {
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    // notification payload는 SDK 기본 알림을 사용해 중복 표시를 막습니다.
    if (payload.notification) {
      return;
    }

    const title = payload.data?.title ?? '알림';
    const options = {
      body: payload.data?.body ?? '',
      icon: '/web-app-manifest-192x192.png',
      data: {
        url: payload.data?.url ?? '/profile',
      },
    };

    self.registration.showNotification(title, options);
  });
}

// 새로운 서비스워커로 즉시 교체되도록 설치 직후 활성화 대기 상태를 건너뜁니다.
self.addEventListener('install', () => {
  self.skipWaiting();
});

// 활성화 시점에 기존 탭 제어권을 즉시 가져옵니다.
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url ?? '/profile';

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }

        return undefined;
      }),
  );
});
