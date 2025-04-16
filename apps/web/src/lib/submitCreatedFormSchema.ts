import type { z } from 'zod';
import type { DocumentActivity, FilingStatus } from '@repo/shared';
import { DocumentStatus } from '@repo/shared';
import type { createdFormSchema } from '../constant/schema';
import uploadFileToS3 from '../service/aws/uploadFileToS3';
import createDocument from '../service/document/createDocument';
import updateFilingName from '../service/filing/updateFiling';
import { getFileType } from './utils';

export default async function submitCreatedFormSchema(
  values: z.infer<typeof createdFormSchema>,
  projectId: string,
  filingId: string,
  userId: string,
  newFilingstatus?: FilingStatus,
  newDocumentStatus?: DocumentStatus,
) {
  const files = values.file as FileList;
  const swap = getFileType(files[0]) !== 'pdf';
  const pdfFile = files[swap ? 1 : 0];
  const docFile = files[swap ? 0 : 1] as File | undefined;
  const folderName = `${projectId}/${filingId}`;

  const [pdfName, docName] = await Promise.all([
    pdfFile &&
      uploadFileToS3({
        file: pdfFile,
        folderName,
      }),
    docFile &&
      uploadFileToS3({
        file: docFile,
        folderName,
      }),
  ]);

  if ((pdfFile && !pdfName) || (docFile && !docName))
    throw new Error('Upload file failed');

  const [newDocument] = await Promise.all([
    createDocument({
      document: {
        filingId,
        pdfName,
        docName,
        activity: values.activity as DocumentActivity,
        userId,
        status: newDocumentStatus ?? DocumentStatus.WAIT_FOR_SECRETARY,
        comment: values.comment,
      },
    }),
    newFilingstatus &&
      updateFilingName({
        filingId,
        filingStatus: newFilingstatus,
      }),
  ]);

  return newDocument;
}
