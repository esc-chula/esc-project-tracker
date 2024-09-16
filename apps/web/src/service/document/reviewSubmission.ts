import { trpc } from '../../app/trpc';
import { DocumentType } from '../../interface/document';
export default async function reviewSubmission({
  id,
  updatedStatus,
}: {
  id: string;
  updatedStatus: boolean;
}): Promise<DocumentType> {
  try {
    const result = await trpc.document.reviewSubmission.mutate({
      id,
      updatedStatus,
    });
    return result;
  } catch (error) {
    throw new Error('failed');
  }
}
