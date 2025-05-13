'use client';
import { useEffect, useState } from 'react';
import findAllGendoc from '@/src/service/gendoc/findAllGendoc';
import type { Gendoc } from '@/src/interface/gendoc';
import { GendocTable } from './gendocTable';

export default function GendocPage({
  userId,
  isAdmin = false,
}: {
  userId: string;
  isAdmin?: boolean;
}) {
  const [gendocs, setGendocs] = useState<Gendoc[]>([]);
  const appendGendoc = (gendoc: Gendoc) => {
    setGendocs((prevGendocs) => [...prevGendocs, gendoc]);
  };

  useEffect(() => {
    try {
      void findAllGendoc().then((gendocsData) => {
        setGendocs(gendocsData);
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching filings:', err.message);
      }
    }
  }, [userId]);
  return (
    <GendocTable data={gendocs} userId={userId} appendGendoc={appendGendoc} />
  );
}
