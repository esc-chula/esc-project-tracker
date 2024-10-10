import LoginButton from '@/src/components/common/login-button';
import OnboardingPageHeader from '@/src/components/header/OnboardingPageHeader';

export default function Page() {
  return (
    <main className="flex flex-col py-10 px-4 items-center w-full gap-10">
      <OnboardingPageHeader />
      <div className="flex flex-col items-center">
        <LoginButton />
      </div>
    </main>
  );
}
