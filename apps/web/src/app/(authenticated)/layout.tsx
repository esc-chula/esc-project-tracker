import React from 'react';
import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';
import { authenticate } from '@/src/service/auth';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await authenticate({
    roles: ['student', 'admin'],
  });
  return (
    <div className="flex">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
