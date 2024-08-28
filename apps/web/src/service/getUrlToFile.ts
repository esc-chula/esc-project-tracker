import { trpc } from '../app/trpc';

export default async function getUrlToFile(obj: {
  fileName: string;
  folderName?: string;
}): Promise<string> {
  try {
    const res = await trpc.aws.getUrlToFile.query(obj);
    return res;
  } catch (e) {
    console.log(e);
    throw new Error('Can not get url to file... try again');
  }
}
