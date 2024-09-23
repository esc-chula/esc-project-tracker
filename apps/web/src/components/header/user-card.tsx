import { Bell, ChevronDown } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

import { getUsername, signOut } from '@/src/service/auth';
import UserCardMenu from './user-card-menu';

export default async function UserCard() {
  const username = await getUsername();

  return (
    <div className="h-12 w-[300px] flex items-center ml-auto">
      <div className="pr-4 border-r border-black mr-4 h-full flex items-center">
        <Bell size={28} />
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-[46px] w-[46px]">
          <AvatarImage src="/icons/circle-user-round.svg" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <UserCardMenu username={username} />
      </div>
    </div>
  );
}
