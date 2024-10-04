import { SquarePen } from 'lucide-react';
import { Button } from '../../ui/button';
import { IoReturnUpBack } from 'react-icons/io5';
import Link from 'next/link';

export default function FilingReplyButtons({
  filingId,
  projectId,
  setShowComment,
}: {
  filingId: string;
  projectId: string;
  setShowComment: (value: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-x-4 flex flex-row justify-start ">
        <Button
          variant="outline"
          onClick={() => {
            setShowComment(true);
          }}
          className="rounded-xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
        >
          <IoReturnUpBack className="h-8 w-8 mr-2" />
          ตอบกลับ
        </Button>
        <Link
          href={`/admin/project/${projectId}/${filingId}?showCreateDocument=true`}
        >
          <div className="rounded-xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red border disabled:bg-lightgray disabled:text-white disabled:border-none flex items-center hover:bg-accent hover:text-accent-foreground">
            <SquarePen className="h-8 w-8 mr-2" />
            แก้ไข
          </div>
        </Link>
      </div>
      <div className="text-sm text-red">
        * การแก้ไขเอกสารจะต้องแก้ไขในหน้ารายละเอียดของเอกสารนั้น
      </div>
    </div>
  );
}
