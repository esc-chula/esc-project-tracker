import { FaCircleXmark } from 'react-icons/fa6';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoFileTray } from 'react-icons/io5';

export default function FilingNotFound({ value }: { value: number }) {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col text-gray-300 font-sukhumvit text-2xl">
      {value === 0 ? (
        <IoFileTray size={80} className="mb-5" />
      ) : value === 1 ? (
        <FaCircleXmark size={80} className="mb-5" />
      ) : (
        <IoIosCheckmarkCircle size={80} className="mb-5" />
      )}
      <div>ยังไม่มีเอกสาร</div>
      <div>
        {value === 0
          ? 'รอดำเนินการ'
          : value === 1
            ? 'ถูกตีกลับ'
            : 'ได้รับการอนุมัติ'}
      </div>
    </div>
  );
}
