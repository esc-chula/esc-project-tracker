import Link from 'next/link';
import { CgFileDocument } from 'react-icons/cg';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

export default function FilingReplyHeader({
  projectId,
  filingId,
  name,
  documentCode,
}: {
  projectId: string;
  filingId: string;
  name: string | undefined;
  documentCode: string;
}) {
  return (
    <div className="font-sukhumvit text-2xl font-bold flex items-center justify-between w-full">
      <div className="flex flex-row">
        <CgFileDocument size={30} className=" mr-2 text-center" />
        <div>{documentCode}</div>
        <div className="truncate max-w-xs ml-2">
          {name || 'เอกสารไม่มีชื่อ'}
        </div>
      </div>
      <Link href={`/admin/project/${projectId}/${filingId}`}>
        <div className="text-sm font-normal hover:cursor-pointer inline-flex items-center">
          รายละเอียดเพิ่มเติม <HiMiniArrowLongRight className="inline-block" />
        </div>
      </Link>
    </div>
  );
}
