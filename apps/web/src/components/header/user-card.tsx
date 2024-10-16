'use client';
import { Bell } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';

import { getUsername } from '@/src/service/auth';
import UserCardMenu from './user-card-menu';
import { useEffect, useState } from 'react';

export default function UserCard() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    getUsername().then((usernameData) => {
      setUsername(usernameData);
    });
  });

  return (
    <div className="h-12 w-[300px] flex items-center ml-auto">
      <div className="pr-4 border-r border-black mr-4 h-full flex items-center opacity-35">
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
