import { DocumentStatus } from '@/src/constant/enum';
import { buttonColors } from '@/src/styles/enumMap';
import { TextMyFilingStatus } from '@/src/styles/enumMap';
import { Undo2 } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';

export default function StatusButton({
  status,
  displayEditButton,
  displayReplyButton = false,
  setShowCreateDocument,
}: {
  status: DocumentStatus;
  displayEditButton?: boolean;
  displayReplyButton?: boolean;
  setShowCreateDocument?: (showCreateDocument: boolean) => void;
}) {
  return (
    <div className="flex flex-col space-y-5 text-xxs font-extrabold w-full">
      <div
        className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit ${buttonColors[status]}`}
      >
        {TextMyFilingStatus[status]}
      </div>
      {(displayEditButton || displayReplyButton) && setShowCreateDocument && (
        <button
          onClick={() => {
            setShowCreateDocument(true);
          }}
          className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit bg-white border-red border-2  text-red flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out`}
        >
          {displayReplyButton ? (
            <>
              <Undo2 className="text-center items-center mr-3" />
              <div className="text-center items-center ">ตอบกลับ</div>
            </>
          ) : (
            <>
              <FaEdit className="text-center items-center mr-3" />
              <div className="text-center items-center ">แก้ไข</div>
            </>
          )}
        </button>
      )}
    </div>
  );
}
