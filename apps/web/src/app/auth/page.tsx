'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { signIn } from '@/src/service/auth';

export default function Page({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}): JSX.Element {
  const router = useRouter();

  const token = searchParams.token;
  useEffect(() => {
    async function signInAndRedirect() {
      const { accessToken, refreshToken } = await signIn(token);
      /* apply callbackurl here */
      if (accessToken && refreshToken) router.push('/home');
      else router.push('/login');
    }
    signInAndRedirect();
  }, []);

  return (
    <div className="h-dvh w-full grid place-content-center">
      {/* lucide spinner */}
      <LoaderCircle className="animate-spin opacity-10" size={64} />
    </div>
  );
}
