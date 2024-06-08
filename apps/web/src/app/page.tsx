import OnboardingPageHeader from "@/src/components/header/OnboardingPageHeader"
import { Button } from "@/src/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <main className="flex flex-col items-center">
        <OnboardingPageHeader showAdminPortal />
        <Image
          alt="main-logo"
          src="/main-logo.webp"
          width={566}
          height={564}
          className="w-[35vh] mt-10 mb-6 aspect-auto"
        />
        <h1 className="text-5xl font-bold mb-4">Document System</h1>
        <h2 className="text-2xl mb-6">
          ดำเนินการเรื่องเอกสารของคณะฯ ไม่ยุ่งยาก สะดวก รวดเร็ว ครบจบทุกกระบวนการ
          มาเริ่มต้นเอกสารกัน !
        </h2>

        <Button
          className="rounded-[80px] bg-gradient-red text-2xl font-bold px-12 py-[10px] h-16"
          asChild>
          <Link href="#">เข้าสู่ระบบ</Link>
        </Button>
      </main>
    </>
  )
}
