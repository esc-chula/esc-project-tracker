import React from 'react';
import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
