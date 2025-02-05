'use client';
import { useEffect, useState } from 'react';
import type { FilingType } from '@/src/interface/filing';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import { StatusTable } from './statusTable';

export default function StatusPage({ userId }: { userId: string }) {
  const [statuses, setStatuses] = useState<FilingType[]>([]);

  useEffect(() => {
    try {
      void getFilingsByUserId(userId).then((statusesData) => {
        setStatuses(statusesData);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching filings:', err.message);
      }
    }
  }, [userId]);
  return (
    <section className="w-full pl-15 pr-5">
      <StatusTable data={statuses} />
    </section>
  );
}
