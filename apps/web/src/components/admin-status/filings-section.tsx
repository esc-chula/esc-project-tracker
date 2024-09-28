'use client';
import FilingTab from './tab/filing-tab';
import FilingReplyArea from './reply/filing-reply-area';
import { useState } from 'react';

export default function FilingsSection() {
  const [selectedFilingId, setSelectedFilingId] = useState<string>('');

  return (
    <div className="pl-15 overflow flex flex-row">
      <FilingTab
        sentSelectedFilingIdToParent={(id: string) => setSelectedFilingId(id)}
      />
      <FilingReplyArea selectedFilingId={selectedFilingId} />
    </div>
  );
}
