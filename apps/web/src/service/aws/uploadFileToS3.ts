import { env } from 'next-runtime-env';
import { getCookies } from '../auth';

interface UploadResponse {
  statusCode: number;
  uploadedFileName: string;
}

export default async function uploadFileToS3(obj: {
  file: File | undefined;
  folderName?: string;
}) {
  try {
    if (!obj.file) throw new Error('No file to upload');

    const formData = new FormData();
    formData.append('file', obj.file);
    if (obj.folderName) formData.append('folderName', obj.folderName);
    formData.append('fileName', obj.file.name);
    const cookies = await getCookies();
    const response = await fetch(
      `${env('NEXT_PUBLIC_API_SERVER_URL')}aws/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      },
    );
    const responseJSON: UploadResponse = await response.json();
    if (responseJSON.statusCode !== 201) throw new Error('Upload file failed');
    return responseJSON.uploadedFileName;
  } catch (e) {
    console.log(e);
    throw new Error('อัปโหลดไฟล์ไม่สำเร็จ');
  }
}
