export default async function uploadFileToS3(obj: {
  file: File | undefined;
  folderName?: string;
}) {
  try {
    if (!obj.file) throw new Error('No file to upload');

    const formData = new FormData();
    formData.append('file', obj.file);
    if (obj.folderName) formData.append('folderName', obj.folderName);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/aws/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );
    return await response.json();
  } catch (e) {
    console.log(e);
    throw new Error('Can not upload file... try again');
  }
}
