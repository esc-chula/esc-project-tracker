'use client';
import FilingTab from './filing-tab';
import FilingReplyArea from './filing-reply-area';
import { useState } from 'react';

export default function FilingsSection() {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');

  return (
    <div className="h-full pl-15 overflow flex flex-row">
      <FilingTab
        sentSelectedFilingIdToParent={(id: string) => setSelectedFilingId(id)}
      />
      <FilingReplyArea selectedFilingId={selectedFilingId} />
    </div>
  );
}
