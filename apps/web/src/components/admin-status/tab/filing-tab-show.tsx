'use client';
import FilingTabShowDetail from './filing-tab-show-detail';
import FilingTabNotFound from './filing-tab-not-found';
import { useState, useEffect } from 'react';
import { FilingsWithDocument } from '@/src/types/filing';

export default function FilingTabShow({
  tabValue,
  filingWithPendingDocuments,
  selectedFilingId,
  setSelectedFilingId,
}: {
  tabValue: number;
  filingWithPendingDocuments: FilingsWithDocument[];
  selectedFilingId: string;
  setSelectedFilingId: (id: string) => void;
}) {
  if (filingWithPendingDocuments.length === 0) {
    return <FilingTabNotFound value={tabValue} />;
  }
  return (
    <div className="w-full h-full flex flex-col font-sukhumvit pt-2">
      {filingWithPendingDocuments.map((filingWithDocument, index) => (
        <FilingTabShowDetail
          key={index}
          filingWithPendingDocument={filingWithDocument}
          setSelectedFilingId={setSelectedFilingId}
          selectedFilingId={selectedFilingId}
          isActive={selectedFilingId === filingWithDocument.filing.id}
          setActiveFiling={setSelectedFilingId}
        />
      ))}
    </div>
  );
}
