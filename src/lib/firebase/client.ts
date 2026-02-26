import { getApps, initializeApp } from 'firebase/app';

// Firebase 콘솔에서 발급받은 웹 앱 설정값을 환경변수에서 읽습니다.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Next.js 개발 모드(HMR)에서 initializeApp이 여러 번 호출되는 것을 방지합니다.
export const firebaseApp =
  getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
