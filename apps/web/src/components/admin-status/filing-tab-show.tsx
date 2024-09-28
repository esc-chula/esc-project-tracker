'use client';
import { FilingType } from '@/src/interface/filing';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';
import { useState, useEffect } from 'react';

export default function FilingTabShow({
  tabValue,
  filings,
  isContinue,
  sentSelectedFilingIdToParent,
}: {
  tabValue: number;
  filings: FilingType[];
  isContinue?: boolean;
  sentSelectedFilingIdToParent?: (id: string) => void;
}) {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');

  useEffect(() => {
    if (isContinue && selectedFilingId) {
      sentSelectedFilingIdToParent?.(selectedFilingId);
    }
  }, [selectedFilingId, isContinue]);

  if (filings.length === 0) {
    return <FilingTabNotFound value={tabValue} />;
  }
  return (
    <div className="w-full h-full flex flex-col font-sukhumvit pt-2">
      {filings.map((filing, index) => (
        <FilingTabShowDetail
          key={index}
          filing={filing}
          isContinue={isContinue}
          sentSelectedFilingIdToParent={setSelectedFilingId}
        />
      ))}
    </div>
  );
}
