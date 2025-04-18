import type { DocumentStatus } from '@repo/shared';
import { Undo2 } from 'lucide-react';
import { FaEdit } from 'react-icons/fa';
import { buttonColors, TextMyFilingStatus } from '@/src/styles/enumMap';

export default function StatusButton({
  status,
  showEditButton,
  showReplyButton = false,
  setShowCreateDocument,
}: {
  status: DocumentStatus;
  showEditButton?: boolean;
  showReplyButton?: boolean;
  setShowCreateDocument?: (showCreateDocument: boolean) => void;
}) {
  return (
    <div className="flex flex-col space-y-5 text-xxs font-extrabold w-full">
      <div
        className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit ${buttonColors[status]}`}
      >
        {TextMyFilingStatus[status]}
      </div>
      {(showEditButton || showReplyButton) && setShowCreateDocument && (
        <button
          onClick={() => {
            setShowCreateDocument(true);
          }}
          className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit bg-white border-red border-2  text-red flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out`}
        >
          {showReplyButton ? (
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
