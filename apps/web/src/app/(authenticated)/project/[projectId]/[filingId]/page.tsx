'use client';

import Header from '@/src/components/header/header';
import DocumentStatusStepper from '@/src/components/status/StatusStepper';
import { FilingStatus } from '@/src/constant/enum';
import { Filing } from '@/src/interface/filing';
import FilingTimeline from '@/src/components/filling-detail/filingTimeline';
import Subtitle from '@/src/components/header/subtitle';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/src/components/ui/use-toast';
import FilingTimelineHeader from '@/src/components/filling-detail/filingTimelineHeader';
import findDocumentsByFilingId from '@/src/service/document/findDocumentsByFilingId';
import { Document } from '@/src/interface/document';
import { findUserByUserId } from '@/src/service/findUserByUserId';
import { User } from '@/src/interface/user';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import deleteDocument from '@/src/service/document/deleteDocument';
import updateFilingName from '@/src/service/filing/updateFiling';

export default function Page({
  params,
}: {
  params: { projectId: string; filingId: string };
}) {
  const [filing, setFiling] = useState<Filing | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showCreateDocument, setShowCreateDocument] = useState<boolean>(false);
  const [usernameMap, setUsernameMap] = useState<Map<string, User>>(new Map());
  const [latestDocument, setLatestDocument] = useState<Document | null>(null);
  // check uuid
  // ถ้าสร้าง doc ใหม่ usernameMap ต้องอัปเดตมั้ย?
  // get Url fileDisplay
  const { toast } = useToast();
  const setStatus = useMemo(
    () => (status: FilingStatus) => {
      setFiling((prev) => (prev ? { ...prev, status } : null));
    },
    [],
  );

  const getUsernameMap = async (documents: Document[]) => {
    const uniqueUserIds = new Set(
      documents.map((doc) =>
        doc.userId ? findUserByUserId(doc.userId) : undefined,
      ),
    );
    const users = await Promise.all(uniqueUserIds);

    const updatedUsernameMap = new Map();
    users.forEach((user) => {
      if (user) updatedUsernameMap.set(user.id, user);
    });
    return updatedUsernameMap;
  };

  const fetchData = async () => {
    try {
      const [filingData, documentsData, latestDocumentData] = await Promise.all(
        [
          getFilingByFilingId(params.filingId),
          findDocumentsByFilingId(params.filingId),
          findLatestDocumentByFilingId(params.filingId),
        ],
      );
      if (filingData) setFiling(filingData);
      if (latestDocumentData) setLatestDocument(latestDocumentData);

      if (documentsData.length === 0) return;
      setDocuments(documentsData);
      // get pdf url

      const updatedUsernameMap = await getUsernameMap(documentsData);
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
  const handleDeleteDocument = async (documentId: string) => {
    try {
      await Promise.all([
        filing?.status === FilingStatus.DOCUMENT_CREATED &&
          documents.length === 1 &&
          updateFilingName({
            filingId: filing?.id,
            filingStatus: FilingStatus.DRAFT,
          }),
        deleteDocument(documentId),
      ]);

      const updatedDocuments = documents.filter((doc) => doc.id !== documentId);
      setDocuments(updatedDocuments);
      if (
        filing?.status === FilingStatus.DOCUMENT_CREATED &&
        documents.length === 1
      )
        setStatus(FilingStatus.DRAFT);
      toast({
        title: 'ลบสำเร็จ',
        description: 'ลบเอกสารฉบับร่างสำเร็จ',
      });
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
    fetchData();
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
          latestDocument={latestDocument}
          setStatus={setStatus}
          setDocuments={setDocuments}
          projectId={params.projectId}
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
          handleDeleteDocument={handleDeleteDocument}
        />
      </section>
    </main>
  );
}
