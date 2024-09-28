'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    async function signIn() {
      await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
        }),
      })
        .then((res) => {
          if (res.status !== 200) {
            router.push('/login');
          }
          router.push('/home');
        })
        .catch((err) => {
          console.error('Error signing in: ', err);
          router.push('/login');
        });
    }

    signIn();
  }, [token, router]);

  return (
    <div className="h-dvh w-full grid place-content-center">
      {/* lucide spinner */}
      <LoaderCircle className="animate-spin opacity-10" size={64} />
    </div>
  );
}
