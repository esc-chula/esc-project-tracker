import { CircleUserRound } from "lucide-react";
import NameDate from "./nameDate";
import Image from "next/image";
import StatusButton from "./statusButton";
import { FilingStatus } from "@/src/constant/enum";

export default function DisplayWithStatus() {
  return (
    <div className="bg-gray-100 rounded-lg font-sukhumvit w-[70vw] text-xl">
      <div className="flex flex-row px-8 items-start">
        <NameDate
          title="Secretary ESC"
          date="ส่งเอกสารเมื่อ 41 มิ.ย 2567 14.30.00"
          activity="สร้าง/ แก้ไข"
        >
          <Image
            src="/icons/esc-red.svg"
            width={30}
            height={30}
            alt="esc-icon"
          />
        </NameDate>
        <div className="px-8 py-4 font-bold space-y-4">
          <div>รายละเอียด</div>
          <textarea
            className="bg-white rounded-lg min-h-[10vh] p-5 font-normal text-gray-600 break-words resize-none w-[35vw]"
            defaultValue="smclmsdcvms;dvsdmvdsnvnfvjndsknvkdnvkdnvksdnvksdnvksdnvk
"
          ></textarea>
        </div>
        <div className="py-5 ml-auto">
          <StatusButton status={FilingStatus.RETURNED} />
        </div>
      </div>
    </div>
  );
}
