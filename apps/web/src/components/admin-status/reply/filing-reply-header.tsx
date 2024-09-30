import { CgFileDocument } from 'react-icons/cg';
import { HiMiniArrowLongRight } from 'react-icons/hi2';

export default function FilingReplyHeader({
  projectId,
  filingId,
  projectCode,
  filingCode,
  name,
}: {
  projectId: string;
  filingId: string;
  projectCode: string | undefined;
  filingCode: string | undefined;
  name: string | undefined;
}) {
  return (
    <div className="font-sukhumvit text-2xl font-bold flex items-center justify-between w-full">
      <div className="flex flex-row">
        <CgFileDocument size={30} className=" mr-2 text-center" />
        <div>
          {projectCode || 'xxxx'}-{filingCode || 'xxxx'}
        </div>
        <div className="truncate max-w-xs ml-2">
          {name || 'เอกสารไม่มีชื่อ'}
        </div>
      </div>
      <div
        className="text-sm font-normal hover:cursor-pointer"
        onClick={() => {
          window.location.replace(`/admin/project/${projectId}/${filingId}`);
        }}
      >
        รายละเอียดเพิ่มเติม <HiMiniArrowLongRight className="inline-block" />
      </div>
    </div>
  );
}
