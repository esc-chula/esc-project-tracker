import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import Link from "next/link"

export default function OnboardingPageHeader({ showAdminPortal }: { showAdminPortal?: true }) {
  return (
    <>
      <header
        className={`w-full flex h-[74px] mt-14 px-20 ${showAdminPortal ? "justify-between" : "justify-center"}`}>
        {showAdminPortal && <div className="w-[62.11px]" />}
        <Image src="/icons/esc-red.svg" alt="logo" width={42} height={62} />
        {/* insert callbackurl here */}
        {showAdminPortal && (
          <Link href={`https://account.intania.org/?appId=${process.env.INTANIA_AUTH_APP_ID}&callbackUrl=${process.env.INTANIA_AUTH_REDIRECT_URL}`}>
            <div className="flex flex-col text-sm items-center">
              <Avatar className="w-14 h-14">
                <AvatarImage src="/icons/circle-user-round.svg" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              For Admin
            </div>
          </Link>
        )}
      </header>
    </>
  )
}
