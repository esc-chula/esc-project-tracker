import React from 'react';
import { redirect } from 'next/navigation';
import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';
import { authenticate } from '@/src/service/auth';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticate({
    roles: [],
  }).catch(() => {
    redirect('/');
  });

  return (
    <div className="flex">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
