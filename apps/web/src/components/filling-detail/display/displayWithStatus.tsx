import { CircleUserRound } from "lucide-react";
import NameDate from "./nameDate";
import Image from "next/image";
import StatusButton from "./statusButton";
import { FilingStatus } from "@/src/constant/enum";
import { Collapsible } from "../../ui/collapsible";
import { FaFile } from "react-icons/fa6";
import FileDisplay from "./fileDisplay";

export default function DisplayWithStatus() {
  return (
    <Collapsible className="bg-gray-100 rounded-lg font-sukhumvit text-xl w-full">
      <div className="flex flex-row px-8">
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
        <div className="px-8 py-4 font-bold space-y-4 w-[35vw]">
          <div className="flex flex-row items-center space-x-6">
            <div className="font-bold text-sm">ไฟล์แนบ</div>
            <FileDisplay
              fileName="เอกสารสุดยอดสายลับอิอิอิอิอิอิอิอิอิอิvbvbvbvbvbv"
              fileType="pdf"
              link=""
            />
          </div>
          <div className="font-bold text-sm">ความคิดเห็น</div>
          <textarea
            className="bg-white rounded-lg min-h-[10vh] p-5 font-normal text-gray-600 break-words resize-none w-full text-sm"
            defaultValue="smclmsdcvms;dvsdmvdsnvnfvjndsknvkdnvkdnvksdnvksdnvksdnvk
"
          ></textarea>
        </div>
        <div className="py-8 flex flex-col justify-between w-[5vw] items-end">
          <StatusButton status={FilingStatus.WAIT_FOR_STUDENT_AFFAIR} />
        </div>
      </div>
    </Collapsible>
  );
}
