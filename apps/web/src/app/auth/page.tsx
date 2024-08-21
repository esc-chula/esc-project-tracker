'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/src/service/signIn';

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
    <div>
      <p>loading...</p>
    </div>
  );
}
