'use client';
import { useEffect, useState } from 'react';
import type { FilingType } from '@/src/interface/filing';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import DocumentStatusStepper from './statusStepper';
import { StatusTable } from './statusTable';

export default function StatusPage({ userId }: { userId: string }) {
  const [statuses, setStatuses] = useState<FilingType[]>([]);

  useEffect(() => {
    try {
      getFilingsByUserId(userId).then((statusesData) => {
        setStatuses(statusesData);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching filings:', err.message);
      }
    }
  }, [userId]);
  return (
    <>
      <section className="bg-lightpink flex flex-col pt-12 pb-5 items-center mt-5 w-full">
        <h3 className="mb-8 text-2xl text-intania font-bold">
          ขั้นตอนการส่งเอกสาร
        </h3>
        <DocumentStatusStepper status="DEFAULT" />
      </section>
      <section className="w-full pl-15 pr-5">
        <StatusTable data={statuses} />
      </section>
    </>
  );
}
