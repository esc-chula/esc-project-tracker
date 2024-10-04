'use client';
import FilingTab from './tab/filing-tab';
import FilingReplyArea from './reply/filing-reply-area';
import { useState } from 'react';

export default function FilingsSection() {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');
  const [reviewedFilingId, setReviewedFilingId] = useState<string>('');

  return (
    <div className="pl-15 overflow flex flex-row">
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
