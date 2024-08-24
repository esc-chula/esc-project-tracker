'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/src/service/signIn';
import LandingPageHeader from '@/src/components/header/LandingPageHeader';
import { LoaderCircle } from 'lucide-react';

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
        router.push('/');
      });
  }, [token, router]);

  return (
    <div className="h-dvh w-full grid place-content-center">
      {/* lucide spinner */}
      <LoaderCircle className="animate-spin opacity-10" size={64} />
    </div>
  );
}
