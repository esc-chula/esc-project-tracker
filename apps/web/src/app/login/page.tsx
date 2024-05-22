import LandingPageHeader from "@/src/components/header/LandingPageHeader"
import Image from "next/image"

export default function Page() {
  return (
    <>
      <main className="w-full flex flex-col">
        <LandingPageHeader />
        <Image
          alt="main-logo"
          src="/main-logo.webp"
          width={566}
          height={564}
          className="w-[283px] mt-10 mb-5 mx-auto aspect-auto"
        />
        <h1 className="mx-auto text-6xl font-bold mb-5">Project Tracker</h1>
        <h2 className="mx-auto text-2xl mb-5">
          write down some information that is nesessary to know about this website
        </h2>
      </main>
    </>
  )
}
