'use client';

import { useEffect, useMemo, useState } from 'react';
import { DocumentStatus, FilingStatus } from '@repo/shared';
import Header from '@/src/components/header/header';
import DocumentStatusStepper from '@/src/components/status/statusStepper';
import type { Filing } from '@/src/interface/filing';
import FilingTimeline from '@/src/components/filling-detail/filingTimeline';
import Subtitle from '@/src/components/header/subtitle';
import getFilingByFilingId from '@/src/service/filing/getFilingByFilingId';
import { toast } from '@/src/components/ui/use-toast';
import FilingTimelineHeader from '@/src/components/filling-detail/filingTimelineHeader';
import findDocumentsByFilingId from '@/src/service/document/findDocumentsByFilingId';
import type { Document } from '@/src/interface/document';
import type { User } from '@/src/interface/user';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import deleteDocument from '@/src/service/document/deleteDocument';
import updateFilingName from '@/src/service/filing/updateFiling';
import { isUUID } from '@/src/lib/utils';
import getUsersMap from '@/src/service/user/getUsersMap';
import userOpenFiling from '@/src/service/user-filing/userOpenFiling';

export default function FilingDetailPage({
  params,
  searchParams,
  isAdmin = false,
  userId,
}: {
  params: { projectId: string; filingId: string };
  searchParams: { showCreateDocument: string };
  isAdmin?: boolean;
  userId: string;
}) {
  const [filing, setFiling] = useState<Filing | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showCreateDocument, setShowCreateDocument] = useState<boolean>(
    searchParams.showCreateDocument === 'true',
  );
  const [usernameMap, setUsernameMap] = useState<Map<string, User>>(new Map());
  const [latestDocument, setLatestDocument] = useState<Document | null>(null);
  const setStatus = useMemo(
    () => (status: FilingStatus) => {
      setFiling((prev) => (prev ? { ...prev, status } : prev));
    },
    [],
  );
  const setName = useMemo(
    () => (name: string) => {
      setFiling((prev) => (prev ? { ...prev, name } : prev));
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

      const [filingData, documentsData, latestDocumentData] = await Promise.all(
        [
          getFilingByFilingId(params.filingId),
          findDocumentsByFilingId(params.filingId),
          findLatestDocumentByFilingId(params.filingId),
        ],
      );

      const [updatedUsernameMap] = await Promise.all([
        getUsersMap(documentsData, userId),
        userOpenFiling(userId, params.filingId),
      ]);

      if (filingData) setFiling(filingData);
      if (latestDocumentData) setLatestDocument(latestDocumentData);
      if (documentsData.length > 0) setDocuments(documentsData);
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
      let updatedStatus = FilingStatus.DRAFT;
      for (const doc of documents) {
        if (doc.id === documentId) continue;
        if (doc.status === DocumentStatus.RETURNED) {
          updatedStatus = FilingStatus.RETURNED;
          break;
        }
        if (
          doc.status === DocumentStatus.WAIT_FOR_SECRETARY &&
          (doc.docLastOpen || doc.pdfLastOpen)
        ) {
          updatedStatus = FilingStatus.WAIT_FOR_SECRETARY;
          break;
        }
      }

      await Promise.all([
        filing?.status === updatedStatus &&
          updateFilingName({
            filingId: filing.id,
            filingStatus: updatedStatus,
          }),
        deleteDocument(documentId),
      ]);

      const updatedDocuments = documents.filter((doc) => doc.id !== documentId);
      setDocuments(updatedDocuments);
      setStatus(updatedStatus);
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
      throw new Error('ไม่สามารถลบเอกสารได้');
    }
  };
  useEffect(() => {
    void fetchData();
  }, []);
  return (
    <main className="py-10 px-6">
      <Header>
        <Subtitle
          origin={isAdmin ? '/admin/projects' : undefined}
          project={filing ? filing.projectCode : '...'}
          filing={
            filing
              ? `${filing.projectCode}-${filing.filingCode} ${filing.name}`
              : '...'
          }
          isAdmin={isAdmin}
          projectId={params.projectId}
        />
      </Header>
      <section className="flex flex-col mb-7 items-center mt-10 w-full">
        <h3 className="mb-8 text-2xl font-bold">สถานะเอกสารปัจจุบัน</h3>
        <DocumentStatusStepper status={filing?.status ?? 'LOADING'} />
      </section>
      <section className="mb-7">
        {filing ? (
          <FilingTimelineHeader
            name={filing.name}
            code={`${filing.projectCode}-${filing.filingCode}`}
            status={filing.status}
            documents={documents}
            latestDocument={latestDocument}
            setStatus={setStatus}
            setName={setName}
            setDocuments={setDocuments}
            projectId={params.projectId}
            filingId={params.filingId}
            showCreateDocument={showCreateDocument}
            setShowCreateDocument={setShowCreateDocument}
            userId={userId}
            isAdmin={isAdmin}
            handleDeleteDocument={handleDeleteDocument}
          />
        ) : null}
      </section>

      <section className="relative">
        <FilingTimeline
          documents={documents}
          status={filing?.status ?? FilingStatus.DRAFT}
          showCreateDocument={showCreateDocument}
          setShowCreateDocument={setShowCreateDocument}
          usernameMap={usernameMap}
          handleDeleteDocument={handleDeleteDocument}
          isAdmin={isAdmin}
          folderName={`${params.projectId}/${params.filingId}`}
        />
      </section>
    </main>
  );
}
