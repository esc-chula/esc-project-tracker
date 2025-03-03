'use client';
import { useState } from 'react';
import type { FilingsWithDocument } from '@/src/types/filing';
import FilingTab from './tab/filing-tab';
import FilingReplyArea from './reply/filing-reply-area';

export default function FilingsSection() {
  const [selectedFilingWithDocument, setSelectedFilingWithDocument] = useState<
    FilingsWithDocument | undefined
  >();
  const [reviewedFilingId, setReviewedFilingId] = useState<string>('');

  return (
    <div className="mt-6 overflow flex w-full h-full">
      <FilingTab
        setSelectedFilingWithDocument={setSelectedFilingWithDocument}
        selectedFilingWithDocument={selectedFilingWithDocument}
        reviewedFilingId={reviewedFilingId}
      />
      <FilingReplyArea
        selectedFilingWithDocument={selectedFilingWithDocument}
        setFilingReviewed={setReviewedFilingId}
      />
    </div>
  );
}
