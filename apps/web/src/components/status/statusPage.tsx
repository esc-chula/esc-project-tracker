'use client';
import { useEffect, useState } from 'react';
import type { Filing } from '@/src/interface/filing';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import findAllFiling from '@/src/service/filing/findAllFiling';
import { StatusTable } from './statusTable';

export default function StatusPage({
  userId,
  isAdmin = false,
}: {
  userId: string;
  isAdmin?: boolean;
}) {
  const [statuses, setStatuses] = useState<Filing[]>([]);

  useEffect(() => {
    try {
      if (isAdmin) {
        void findAllFiling().then((statusesData) => {
          setStatuses(statusesData);
        });
      } else {
        void getFilingsByUserId(userId).then((statusesData) => {
          setStatuses(statusesData);
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching filings:', err.message);
      }
    }
  }, [userId]);
  return <StatusTable data={statuses} />;
}
