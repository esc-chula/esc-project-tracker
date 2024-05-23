import LandingPageHeader from "@/src/components/header/LandingPageHeader"
import { Button } from "@/src/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
  return (
    <>
      <main className="flex flex-col">
        <LandingPageHeader />
        <Image
          alt="main-logo"
          src="/main-logo.webp"
          width={566}
          height={564}
          className="w-[35vh] mt-10 mb-5 mx-auto aspect-auto"
        />
        <h1 className="mx-auto text-6xl font-bold mb-5">Project Tracker</h1>
        <h2 className="mx-auto text-2xl mb-5">
          write down some information that is nesessary to know about this website
        </h2>

        <Button
          className="rounded-[80px] bg-gradient-red mx-auto text-3xl font-bold px-12 py-[10px] h-20"
          asChild>
          <Link href="#">เริ่มต้น</Link>
        </Button>
      </main>
    </>
  )
}
