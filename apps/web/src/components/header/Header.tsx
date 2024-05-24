import { Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <header className="min-h-[50px] flex justify-between gap-3.5 pr-5">
        {children}
        <div className="h-12 w-[284px] flex items-center ml-auto">
          <div className="pr-4 border-r border-black mr-4 h-full flex items-center">
            <Bell size={28} />
          </div>
          <div className="flex items-center gap-4">
            <Avatar className="h-[46px] w-[46px]">
              <AvatarImage src="/icons/circle-user-round.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex gap-3">
                  <span className="line-clamp-1 w-full text-left">นภันต์ โชติช่วงนภา</span>
                  <ChevronDown size={24} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  )
}
