'use client';
import { useState } from 'react';
import FilingTab from './tab/filing-tab';
import FilingReplyArea from './reply/filing-reply-area';

export default function FilingsSection() {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');
  const [reviewedFilingId, setReviewedFilingId] = useState<string>('');

  return (
    <div className="mt-6 overflow flex flex-row">
      <FilingTab
        setSelectedFilingId={setSelectedFilingId}
        selectedFilingId={selectedFilingId}
        reviewedFilingId={reviewedFilingId}
      />
      <FilingReplyArea
        selectedFilingId={selectedFilingId}
        setFilingReviewed={setReviewedFilingId}
      />
    </div>
  );
}
