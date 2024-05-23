"use client"

import OnboardingPageHeader from "@/src/components/header/OnboardingPageHeader"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
  const [isAccepted, setIsAccepted] = useState(false)
  return (
    <>
      <main className="flex flex-col items-center">
        <OnboardingPageHeader />
        <h1 className="text-3xl font-bold mb-5 pt-5">นโยบายการจัดเก็บข้อมูลส่วนบุคคล</h1>
        <div className="max-w-md border-2 px-2 shadow-md overflow-y-scroll max-h-[40vh]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error eligendi amet fuga
          blanditiis sunt soluta ab id. Quod nisi similique omnis molestias excepturi, nesciunt unde
          sequi natus dolorem inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Voluptas, sapiente? Tenetur asperiores velit quae fugit iste, veritatis aperiam ullam nisi
          voluptatum natus excepturi ea non illo ratione cupiditate, assumenda adipisci.Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eum error eligendi amet fuga blanditiis sunt
          soluta ab id. Quod nisi similique omnis molestias excepturi, nesciunt unde sequi natus
          dolorem inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas,
          sapiente? Tenetur asperiores velit quae fugit iste, veritatis aperiam ullam nisi
          voluptatum natus excepturi ea non illo ratione cupiditate, assumenda adipisci.Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Eum error eligendi amet fuga blanditiis sunt
          soluta ab id. Quod nisi similique omnis molestias excepturi, nesciunt unde sequi natus
          dolorem inventore! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas,
          sapiente? Tenetur asperiores velit quae fugit iste, veritatis aperiam ullam nisi
          voluptatum natus excepturi ea non illo ratione cupiditate, assumenda adipisci.
        </div>
        <div className="flex gap-5 items-center pt-6 pb-5">
          <Checkbox
            id="terms"
            className="w-7 h-7 rounded-full"
            onClick={() => setIsAccepted(!isAccepted)}
          />
          <label htmlFor="terms" className="text-xl leading-none">
            ฉันยอมรับเงื่อนไขและยินยอมให้เปิดเผยข้อมูลส่วนบุคคล
          </label>
        </div>
        <Link href="#">
          <Button
            className="rounded-[80px] bg-gradient-red text-2xl font-bold px-12 py-[10px] h-16"
            disabled={!isAccepted}>
            รับทราบและยินยอม
          </Button>
        </Link>
      </main>
    </>
  )
}
