'use client';
import { Radio } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import DocumentStatusStepper from '@/src/components/status/StatusStepper';
import { StatusTable } from '@/src/components/status/StatusTable';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import { FilingType } from '@/src/interface/filing';
import { useToast } from '@/src/components/ui/use-toast';
import { useEffect, useState } from 'react';
import FilingsSection from '@/src/components/admin-status/filings-section';
import FilingReplyArea from '@/src/components/admin-status/reply/filing-reply-area';

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
