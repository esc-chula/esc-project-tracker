'use client';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/src/components/ui/avatar';
import { getUsername } from '@/src/service/auth';
import UserCardMenu from './user-card-menu';

export default function UserCard({ usernameData }: { usernameData?: string }) {
  const [username, setUsername] = useState(usernameData || '');
  useEffect(() => {
    if (usernameData) return;
    void getUsername().then((fetchedUsername) => {
      setUsername(fetchedUsername);
    });
  }, []);

  return (
    <div className="h-12 w-[300px] flex items-center justify-end">
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
