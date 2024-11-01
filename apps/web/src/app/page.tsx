import OnboardingPageHeader from '@/src/components/header/OnboardingPageHeader';
import { Button } from '@/src/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { env } from 'next-runtime-env';

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center">
        <OnboardingPageHeader showAdminPortal />
        <div className="mx-8 flex flex-col items-center">
          <Image
            alt="main-logo"
            src="/main-logo.webp"
            width={566}
            height={564}
            className="w-[35vh] mt-10 mb-6 aspect-auto"
          />
          <h1 className="text-5xl font-bold mb-4">Document System</h1>
          <h2 className="text-2xl mb-6 text-center">
            ดำเนินการเรื่องเอกสารของคณะฯ ไม่ยุ่งยาก สะดวก รวดเร็ว
            ครบจบทุกกระบวนการ มาเริ่มต้นเอกสารกัน !
          </h2>
        </div>
        <Button
          className="rounded-[80px] bg-gradient-red text-2xl font-bold px-12 py-[10px] h-16"
          asChild
        >
          {/* insert callbackurl here */}
          <Link href="/login">เริ่มต้น</Link>
        </Button>
      </main>
    </>
  );
}
