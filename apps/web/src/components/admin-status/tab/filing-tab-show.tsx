'use client';
import { FilingType } from '@/src/interface/filing';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';
import { useState, useEffect } from 'react';
import { FilingsWithDocument } from '@/src/types/filing';

export default function FilingTabShow({
  tabValue,
  filingWithPendingDocuments,
  sentSelectedFilingIdToParent,
}: {
  tabValue: number;
  isContinue?: boolean;
  filingWithPendingDocuments: FilingsWithDocument[];
  sentSelectedFilingIdToParent?: (id: string) => void;
}) {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');

  useEffect(() => {
    if (selectedFilingId) {
      sentSelectedFilingIdToParent?.(selectedFilingId);
    }
  }, [selectedFilingId]);

  if (filingWithPendingDocuments.length === 0) {
    return <FilingTabNotFound value={tabValue} />;
  }
  return (
    <div className="w-full h-full flex flex-col font-sukhumvit pt-2">
      {filingWithPendingDocuments.map((filingWithDocument, index) => (
        <FilingTabShowDetail
          key={index}
          filingWithPendingDocument={filingWithDocument}
          sentSelectedFilingIdToParent={setSelectedFilingId}
          isActive={selectedFilingId === filingWithDocument.filing.id}
          setActiveFiling={setSelectedFilingId}
        />
      ))}
    </div>
  );
}
