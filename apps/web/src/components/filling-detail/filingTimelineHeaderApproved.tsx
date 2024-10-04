import { BiSolidFilePdf } from 'react-icons/bi';
import { Button } from '../ui/button';
import { CircleCheck } from 'lucide-react';
import getUrlToFile from '@/src/service/aws/getUrlToFile';

export default function FilingTimelineHeaderApproved({
  fileName,
  folderName,
  noBadge = false,
}: {
  fileName: string;
  folderName?: string;
  noBadge?: boolean;
}) {
  const handleClick = async () => {
    const signedUrl = await getUrlToFile({
      fileName,
      folderName,
    });
    window.open(signedUrl, '_blank');
  };
  return (
    <>
      <Button
        className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white"
        onClick={() => handleClick()}
      >
        <BiSolidFilePdf className="h-8 w-8 mr-2" />
        อ่าน
      </Button>
      {!noBadge && (
        <Button className="pointer-events-none mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-accepted text-white">
          <CircleCheck className="h-8 w-8 mr-2" />
          สำเร็จ
        </Button>
      )}
    </>
  );
}
