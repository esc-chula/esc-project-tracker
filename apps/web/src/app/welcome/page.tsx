import OnboardingPageHeader from '@/src/components/header/onboardingPageHeader';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center">
        <OnboardingPageHeader showAdminPortal />
        <Image
          alt="badge-check"
          src="/icons/badge-check.svg"
          width={154}
          height={154}
          className="mt-14 mb-6 aspect-auto"
        />
        <h1 className="text-4xl font-bold mb-4">สร้างบัญชีใหม่แล้ว!</h1>
        <h2 className="text-xl mb-8">เริ่มต้นใช้งานระบบเอกสารกันเลย!</h2>
        <Button
          className="rounded-[80px] bg-gradient-red text-2xl font-bold px-12 py-[10px] h-16"
          asChild
        >
          <Link href="/home">เริ่มต้น</Link>
        </Button>
      </main>
    </>
  );
}
