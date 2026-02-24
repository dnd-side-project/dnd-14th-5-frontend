// 새로운 서비스워커로 즉시 교체되도록 설치 직후 활성화 대기 상태를 건너뜁니다.
self.addEventListener('install', () => {
  self.skipWaiting();
});

// 활성화 시점에 기존 탭 제어권을 즉시 가져옵니다.
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
