import { Eye } from 'lucide-react';
import getUrlToFile from '@/src/service/aws/getUrlToFile';
import { Button } from '../ui/button';

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
        className="mx-auto rounded-xl text-base px-4 py-2 h-9 font-medium bg-red text-white"
        onClick={() => void handleClick()}
      >
        <Eye className="h-5 w-5 mr-2" />
        ดูเอกสาร
      </Button>
      {/* {!noBadge && (
        <Button className="pointer-events-none mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-accepted text-white">
          <CircleCheck className="h-8 w-8 mr-2" />
          สำเร็จ
        </Button>
      )} */}
    </>
  );
}
