import { FilingStatus } from "@/src/constant/enum";
import { buttonColors } from "@/src/styles/enumMap";
import { TextMyFilingStatus } from "@/src/styles/enumMap";
import { FaEdit } from "react-icons/fa";

export default function StatusButton({ status }: { status: FilingStatus }) {
  return (
    <div className="flex flex-col space-y-5 text-base">
      <button
        className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit min-w-32 ${buttonColors[status]} font-semibold`}
      >
        {TextMyFilingStatus[status]}
      </button>
      {status === FilingStatus.RETURNED ? (
        <button
          className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit min-w-32 bg-white border-red border-2  text-red flex items-center justify-center`}
        >
          <FaEdit className="text-center items-center mr-3" />
          <div className="text-center items-center ">แก้ไข</div>
        </button>
      ) : null}
    </div>
  );
}
