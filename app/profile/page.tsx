import AccountSection from '@/src/components/features/profile/AccountSection/AccountSection';
import NotificationSection from '@/src/components/features/profile/NotificationSection/NotificationSection';
import PersonalInfoSection from '@/src/components/features/profile/PersonalInfoSection/PersonalInfoSection';
import ProfileSummary from '@/src/components/features/profile/ProfileSummary/ProfileSummary';
import TestSection from '@/src/components/features/profile/TestSection/TestSection';
import BottomNavBar from '@/src/components/layout/BottomNavBar/BottomNavBar';
import PageHeader from '@/src/components/layout/PageHeader/PageHeader';

const ProfilePage = () => {
  return (
    <>
      <PageHeader
        title="마이페이지"
        className="fixed top-0 left-1/2 z-50 w-full max-w-110 -translate-x-1/2 bg-g-700 px-7.5"
      />
      <div className="pt-14 pb-32">
        <div className="py-7">
          <ProfileSummary />
        </div>
        <div className="flex flex-col gap-4">
          <TestSection />
          <PersonalInfoSection />
          <NotificationSection />
          <AccountSection />
        </div>
      </div>
      
      <BottomNavBar />
    </>
  );
};

export default ProfilePage;
