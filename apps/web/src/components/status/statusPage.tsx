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
  return <StatusTable data={statuses} />;
}
