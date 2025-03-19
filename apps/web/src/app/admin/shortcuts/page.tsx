import { Inbox } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import FilingsSection from '@/src/components/admin-status/filings-section';

export default function Page() {
  return (
    <main className="py-10 px-6 overflow-y-auto">
      <Header>
        <Title icon={<Inbox size={40} />}>จัดการเอกสาร</Title>
      </Header>
      <FilingsSection />
    </main>
  );
}
