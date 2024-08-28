import { trpc } from '../app/trpc';

export default async function uploadFileToS3(obj: {
  file: Buffer;
  fileName: string;
  folderName?: string;
}) {
  try {
    const res = await trpc.aws.uploadFileToS3.mutate(obj);
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
    throw new Error('Can not upload file... try again');
  }
}
