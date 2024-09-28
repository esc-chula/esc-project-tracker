import { SquarePen } from 'lucide-react';
import { Button } from '../../ui/button';
import { IoReturnUpBack } from 'react-icons/io5';

export default function FilingReplyButtons({}) {
  return (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button
          variant="outline"
          /* onClick={() => {
          setShowCreateDocument(true);
        }} */
          className="mx-auto rounded-xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
        >
          <IoReturnUpBack className="h-8 w-8 mr-2" />
          ตอบกลับ
        </Button>
        <Button
          variant="outline"
          /* onClick={() => {
          setShowCreateDocument(true);
        }} */
          className="mx-auto rounded-xl text-2xl pl-3 pr-4 py-4 h-[52px] text-red font-semibold border-red disabled:bg-lightgray disabled:text-white disabled:border-none"
        >
          <SquarePen className="h-8 w-8 mr-2" />
          แก้ไข
        </Button>
      </div>
      <div className="text-sm text-red">
        * การแก้ไขเอกสารจะต้องแก้ไขในหน้ารายละเอียดของเอกสารนั้น
      </div>
    </div>
  );
}
