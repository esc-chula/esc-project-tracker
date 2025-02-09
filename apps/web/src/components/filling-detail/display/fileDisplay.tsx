import { BiSolidFilePdf } from 'react-icons/bi';
import { FaFile } from 'react-icons/fa6';
import getUrlToFile from '@/src/service/aws/getUrlToFile';

export default function FileDisplay({
  fileName,
  fileType,
  folderName,
}: {
  fileName?: string;
  fileType: string;
  folderName?: string;
}) {
  if (!fileName) return null;
  const extractedFileName = fileName
    .replace(/\{\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\}-/, '')
    .split('.')
    .slice(0, -1)
    .join('.');
  const handleClick = async () => {
    const signedUrl = await getUrlToFile({
      fileName,
      folderName,
    });
    window.open(signedUrl, '_blank');
  };
  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className="w-60 bg-white border-black p-2 rounded-lg border-2 flex space-x-2 items-center hover:scale-105 transition duration-300 hover:cursor-pointer"
    >
      {fileType === 'pdf' ? (
        <BiSolidFilePdf size={20} className="text-red shrink-0" />
      ) : (
        <FaFile size={20} style={{ color: 'skyblue' }} className="shrink-0" />
      )}
      <div className="text-xxs text-start grow">
        <div className="font-semibold overflow-hidden text-ellipsis w-full text-wrap">
          {extractedFileName}
        </div>
        <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-full">
          .{fileType}
        </div>
      </div>
    </button>
  );
}
