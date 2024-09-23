'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { signIn } from '@/src/service/auth';

export default function Auth({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}): JSX.Element {
  const router = useRouter();

  const token = searchParams.token;

  useEffect(() => {
    signIn(token)
      .then(() => {
        router.push('/home');
      })
      .catch(() => {
        router.push('/login');
      });
  }, [token, router]);

  return (
    <div className="h-dvh w-full grid place-content-center">
      {/* lucide spinner */}
      <LoaderCircle className="animate-spin opacity-10" size={64} />
    </div>
  );
}
