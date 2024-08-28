'use client';

import Header from '@/src/components/header/header';
import DocumentStatusStepper from '@/src/components/status/StatusStepper';
import { FilingStatus } from '@/src/constant/enum';
import { Filing } from '@/src/interface/filing';
import FilingTimeline from '@/src/components/filling-detail/filingTimeline';
import Subtitle from '@/src/components/header/subtitle';
import getFilingByFilingId from '@/src/service/getFilingByFilingId';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/src/components/ui/use-toast';
import FilingTimelineHeader from '@/src/components/filling-detail/filingTimelineHeader';
import findDocumentsByFilingId from '@/src/service/findDocumentsByFilingId';
import { Document } from '@/src/interface/document';
import { findUserByUserId } from '@/src/service/findUserByUserId';
import { User } from '@/src/interface/user';

export default function Page({
  params,
}: {
  params: { projectId: string; filingId: string };
}) {
  const [filing, setFiling] = useState<Filing | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showCreateDocument, setShowCreateDocument] = useState<boolean>(false);
  const [usernameMap, setUsernameMap] = useState<Map<string, User>>(new Map());
  const { toast } = useToast();
  const setStatus = useMemo(
    () => (status: FilingStatus) => {
      setFiling((prev) => (prev ? { ...prev, status } : null));
    },
    [],
  );
  const fetchFiling = async () => {
    try {
      const filingData = await getFilingByFilingId(params.filingId);
      console.log(filingData);

      if (filingData) {
        fetchDocuments(filingData);
        setFiling(filingData);
      }
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
  const fetchDocuments = async (filingData: Filing) => {
    try {
      const documentsData = await findDocumentsByFilingId(params.filingId);
      if (documentsData.length === 0) return;
      // get pdf url

      const uniqueUserIds = new Set(
        documentsData.map((doc) =>
          doc.userId ? findUserByUserId(doc.userId) : undefined,
        ),
      );
      const users = await Promise.all(uniqueUserIds);

      const updatedUsernameMap = new Map();
      users.forEach((user) => {
        if (user) {
          updatedUsernameMap.set(user.id, user);
        }
      });

      setDocuments(documentsData);
      setUsernameMap(updatedUsernameMap);
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
  useEffect(() => {
    fetchFiling();
  }, []);
  return (
    <main className="w-full pt-[68px]">
      <div className="pl-15 pr-5">
        <Header>
          <Subtitle
            project={filing ? filing.projectCode : '...'}
            filing={
              filing
                ? filing.projectCode +
                  '-' +
                  filing.FilingCode +
                  ' ' +
                  filing.name
                : '...'
            }
            projectId={params.projectId}
          />
        </Header>
      </div>
      <section className="flex flex-col mb-7 items-center mt-10 w-full">
        <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
        <DocumentStatusStepper status={filing?.status ?? 'LOADING'} />
      </section>
      <section className="px-15 mb-7">
        <FilingTimelineHeader
          name={
            filing
              ? filing.projectCode + '-' + filing.FilingCode + ' ' + filing.name
              : '...'
          }
          status={filing?.status ?? FilingStatus.DRAFT}
          documents={documents}
          latestPDFUrl={documents[0]?.pdfName ?? '#'}
          setStatus={setStatus}
          setDocuments={setDocuments}
          filingId={params.filingId}
          showCreateDocument={showCreateDocument}
          setShowCreateDocument={setShowCreateDocument}
        />
      </section>

      <section className="px-15 relative">
        <FilingTimeline
          documents={documents}
          status={filing?.status ?? FilingStatus.DRAFT}
          showCreateDocument={showCreateDocument}
          setShowCreateDocument={setShowCreateDocument}
          usernameMap={usernameMap}
        />
      </section>
    </main>
  );
}
