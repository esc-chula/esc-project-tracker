import React from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  // TODO: validate accessToken

  if (!accessToken) {
    return redirect('/');
  }

  return (
    <div className="flex">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
}
