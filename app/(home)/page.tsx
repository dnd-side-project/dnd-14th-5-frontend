import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import HomeClientSections from '@/src/components/features/home/HomeClientSections/HomeClientSections';
import HomeHeader from '@/src/components/features/home/HomeHeader/HomeHeader';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';
import { API_BASE_URL } from '@/src/lib/config/env';

const Home = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    redirect('/onboarding');
  }

  const res = await fetch(`${API_BASE_URL}/users/me`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    redirect('/onboarding');
  }

  const user = await res.json();

  if (!user.isOnboarded) {
    redirect('/ztpi-test');
  }

  return (
    <div className="flex min-h-dvh flex-col overflow-hidden">
      <HomeHeader />

      <div className="flex flex-1 flex-col pb-32 pt-8">
        <HomeClientSections />
      </div>

      <BottomNavBar />
    </div>
  );
};

export default Home;
