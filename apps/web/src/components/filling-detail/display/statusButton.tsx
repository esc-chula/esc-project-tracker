import { FilingStatus } from "@/src/constant/enum";
import { buttonColors } from "@/src/styles/enumMap";
import { TextMyFilingStatus } from "@/src/styles/enumMap";
import { FaEdit } from "react-icons/fa";

export default function StatusButton({
  status,
  isSubmitAfterReturn,
}: {
  status: FilingStatus;
  isSubmitAfterReturn?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-5 text-xxs font-extrabold w-full">
      <div
        className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit ${buttonColors[status]}`}
      >
        {TextMyFilingStatus[status]}
      </div>
      {status === FilingStatus.RETURNED && isSubmitAfterReturn === false ? (
        <button
          className={`rounded-lg text-center py-2 px-3 font-bold font-sukhumvit bg-white border-red border-2  text-red flex items-center justify-center hover:scale-105 transition-transform duration-300 ease-in-out`}
        >
          <FaEdit className="text-center items-center mr-3" />
          <div className="text-center items-center ">แก้ไข</div>
        </button>
      ) : null}
    </div>
  );
}
