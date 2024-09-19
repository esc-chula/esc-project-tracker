import Link from 'next/link';
import { BiSolidFilePdf } from 'react-icons/bi';
import { Button } from '../ui/button';
import { CircleCheck } from 'lucide-react';

export default function FilingTimelineHeaderApproved({
  pdfLink,
  noBadge = false,
}: {
  pdfLink: string;
  noBadge?: boolean;
}) {
  return (
    <>
      <Link href={pdfLink} rel="noopener noreferrer" target="_blank">
        <Button className="mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-red text-white">
          <BiSolidFilePdf className="h-8 w-8 mr-2" />
          อ่าน
        </Button>
      </Link>
      {!noBadge && (
        <Button className="pointer-events-none mx-auto rounded-2xl text-2xl pl-3 pr-4 py-4 h-[52px] font-semibold bg-accepted text-white">
          <CircleCheck className="h-8 w-8 mr-2" />
          สำเร็จ
        </Button>
      )}
    </>
  );
}
