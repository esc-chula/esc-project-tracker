'use client';

import Header from '@/src/components/header/header';
import DocumentStatusStepper from '@/src/components/status/StatusStepper';
import { FilingStatus } from '@/src/constant/enum';
import { FilingType } from '@/src/interface/filing';
import FilingTimeline from '@/src/components/filling-detail/filingTimeline';
import Subtitle from '@/src/components/header/subtitle';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import { useEffect, useMemo, useState } from 'react';
import { toast } from '@/src/components/ui/use-toast';
import FilingTimelineHeader from '@/src/components/filling-detail/filingTimelineHeader';
import findDocumentsByFilingId from '@/src/service/document/findDocumentsByFilingId';
import { DocumentType } from '@/src/interface/document';
import { User } from '@/src/interface/user';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import deleteDocument from '@/src/service/document/deleteDocument';
import updateFilingName from '@/src/service/filing/updateFiling';
import { isUUID } from '@/src/lib/utils';
import { getUserId } from '@/src/service/auth';
import getUsersMap from '@/src/service/user/getUsersMap';
import userOpenFiling from '@/src/service/user-filing/userOpenFiling';

export default function Page({
  params,
}: {
  params: { projectId: string; filingId: string };
}) {
  const [filing, setFiling] = useState<FilingType | null>(null);
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [showCreateDocument, setShowCreateDocument] = useState<boolean>(false);
  const [usernameMap, setUsernameMap] = useState<Map<string, User>>(new Map());
  const [latestDocument, setLatestDocument] = useState<DocumentType | null>(
    null,
  );
  const setStatus = useMemo(
    () => (status: FilingStatus) => {
      setFiling((prev) => (prev ? { ...prev, status } : prev));
    },
    [],
  );

  const fetchData = async () => {
    try {
      if (!isUUID(params.projectId)) {
        setTimeout(() => {
          toast({
            title: 'ไม่พบโปรเจค',
            description: 'โปรเจคไม่อยู่ในรูป UUID',
            isError: true,
          });
        }, 3000);
        return;
      }

      const [filingData, documentsData, latestDocumentData, userId] =
        await Promise.all([
          getFilingByFilingId(params.filingId),
          findDocumentsByFilingId(params.filingId),
          findLatestDocumentByFilingId(params.filingId),
          getUserId(),
        ]);
      if (filingData) setFiling(filingData);
      if (latestDocumentData) setLatestDocument(latestDocumentData);

      const [updatedUsernameMap] = await Promise.all([
        getUsersMap(documentsData, userId),
        userOpenFiling(userId, params.filingId),
      ]);
      setUsernameMap(updatedUsernameMap);

      if (documentsData.length > 0) setDocuments(documentsData);
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
            filingId: filing.id,
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
        {filing && (
          <FilingTimelineHeader
            name={
              filing.projectCode + '-' + filing.FilingCode + ' ' + filing.name
            }
            status={filing.status}
            documents={documents}
            latestDocument={latestDocument}
            setStatus={setStatus}
            setDocuments={setDocuments}
            projectId={params.projectId}
            filingId={params.filingId}
            showCreateDocument={showCreateDocument}
            setShowCreateDocument={setShowCreateDocument}
            isAdmin
          />
        )}
      </section>

      <section className="px-15 relative">
        <FilingTimeline
          documents={documents}
          status={filing?.status ?? FilingStatus.DRAFT}
          showCreateDocument={showCreateDocument}
          setShowCreateDocument={setShowCreateDocument}
          usernameMap={usernameMap}
          handleDeleteDocument={handleDeleteDocument}
          isAdmin
          folderName={`${params.projectId}/${params.filingId}`}
        />
      </section>
    </main>
  );
}
