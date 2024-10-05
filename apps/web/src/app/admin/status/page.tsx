import { Radio } from 'lucide-react';
import Header from '@/src/components/header/header';
import Title from '@/src/components/header/title';
import DocumentStatusStepper from '@/src/components/status/StatusStepper';
import { StatusTable } from '@/src/components/status/StatusTable';
import getFilingsByUserId from '@/src/service/filing/getFilingsByUserId';
import { FilingType } from '@/src/interface/filing';
import { useToast } from '@/src/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { getUserId } from '@/src/service/auth';
import FilingsSection from '@/src/components/admin-status/filings-section';
import React from 'react';

export default function Page() {
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<FilingType[]>([]);

  useEffect(() => {
    const fetchFiling = async () => {
      try {
        const userId = await getUserId();
        const data = await getFilingsByUserId(userId);
        setStatuses(data);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: 'ไม่สำเร็จ',
            description: err.message,
            isError: true,
          });
        }
      }
    };
    fetchFiling();
  }, []);

  return (
    <>
      <main className="w-full pt-[68px] overflow-y-auto">
        <div className="pl-15 pr-5 pb-5">
          <Header>
            <Title icon={<Radio size={40} />}>ติดตามสถานะ</Title>
          </Header>
        </div>
        <FilingsSection />
      </main>
    </>
  );
}
