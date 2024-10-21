"use client"

import { useState } from "react"
import { Checkbox } from "./ui/checkbox"
import Link from "next/link"
import { Button } from "./ui/button"

export default function AcceptPDPA() {
  const [isAccepted, setIsAccepted] = useState(false)
  return (
    <>
      <div className="flex gap-5 items-center pt-6 pb-5">
        <Checkbox
          id="terms"
          className="w-7 h-7 rounded-full"
          onClick={() => {setIsAccepted(!isAccepted)}}
        />
        <label htmlFor="terms" className="text-xl leading-none">
          ฉันยอมรับเงื่อนไขและยินยอมให้เปิดเผยข้อมูลส่วนบุคคล
        </label>
      </div>
      <Link href="/welcome">
        <Button
          className="rounded-[80px] bg-gradient-red text-2xl font-bold px-12 py-[10px] h-16"
          disabled={!isAccepted}>
          รับทราบและยินยอม
        </Button>
      </Link>
    </>
  )
}
