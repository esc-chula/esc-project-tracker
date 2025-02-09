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
    <div className="flex overflow-x-clip bg-gray-50 min-h-screen">
      <aside className="h-screen py-6 sticky top-0 pl-6">
        <Navbar />
      </aside>
      <div className="m-6 bg-white h-auto w-full rounded-2xl">{children}</div>
      <Toaster />
    </div>
  );
}
