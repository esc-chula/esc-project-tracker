'use client';
import { FilingType } from '@/src/interface/filing';
import { useEffect } from 'react';
import { FaFile } from 'react-icons/fa';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';

export default function FilingTabShow({
  tabValue,
  filings,
}: {
  tabValue: number;
  filings: FilingType[];
}) {
  if (filings.length === 0) {
    return <FilingTabNotFound value={tabValue} />;
  }
  return (
    <div className="w-full h-full flex flex-col font-sukhumvit pt-2">
      {filings.map((filing, index) => (
        <FilingTabShowDetail key={index} filing={filing} />
      ))}
    </div>
  );
}
