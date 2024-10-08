'use client';
import { Radio } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import FilingsSection from '@/src/components/admin-status/filings-section';
import React from 'react';

export default function Page() {
  return (
    <>
      <main className="w-full pt-[68px] overflow-y-auto">
        <div className="pl-15 pr-5 pb-5">
          <Header>
            <Title icon={<Radio size={40} />}>ติดตามสถานะ</Title>
          </Header>
        </div>
        <FilingsSection />
      </main>
    </>
  );
}
