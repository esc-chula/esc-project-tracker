import { Bell, ChevronDown } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';

export default function UserCard({ userName }: { userName: string }) {
  return (
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
              <span className="line-clamp-1 w-full text-left">{userName}</span>
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
  );
}
