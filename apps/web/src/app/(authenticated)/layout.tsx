import React from 'react';
import { redirect } from 'next/navigation';
import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';
import { cookies } from 'next/headers';

async function authenticate() {
  console.log('Authenticating...');
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);

  if (!accessToken || !refreshToken) {
    redirect('/login');
  }

  await fetch('http://localhost:3000/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
      roles: ['student', 'admin'],
    }),
  })
    .then(async (res) => {
      if (res.status !== 200) {
        redirect('/login');
      }

      return res.json();
    })
    .catch((err) => {
      console.error('Error authenticating: ', err);
      redirect('/login');
    });
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticate();
  return (
    <div className="flex">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
