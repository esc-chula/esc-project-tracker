'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import { signOut } from '@/src/service/auth';
import { ChevronDown } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

interface UserCardMenuProps {
  username: string;
}

export default function UserCardMenu({ username }: UserCardMenuProps) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex gap-3">
          <span className="line-clamp-1 w-full text-left min-w-[100px]">
            {username}
          </span>
          <ChevronDown size={24} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await signOut()
              .then(() => {
                router.push('/login');
              })
              .catch((err) => {
                console.error(err);
                toast({
                  title: 'Sign out failed',
                  description: 'Please try again',
                  variant: 'destructive',
                });
              });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
