import { FilingStatus } from "@/src/constant/enum";
import { FilingType } from "@/src/interface/filing";
import { TextMyProject, buttonColors } from "@/src/styles/enumMap";

export default function FilingMenuItem({
  filing,
  index,
}: {
  filing: FilingType;
  index: number;
}) {
  return (
    <div className="w-full grid grid-cols-9 gap-2 border-b-2 border-gray-300">
      <div className="flex items-center justify-center text-center py-5">
        {filing.projectCode + "-" + filing.FilingCode}
      </div>
      <div className="flex items-center justify-start text-center py-5 col-span-2">
        {filing.name}
      </div>
      <div className="flex items-center justify-center text-center py-5">
        {filing.createdAt}
      </div>
      <div className="flex items-center justify-center text-center py-5">
        still dont have details
      </div>
      <div className="flex items-center justify-center text-center py-5">
        นิสิตผู้รับผิดชอบ have to query
      </div>
      <div className="flex items-center justify-center text-center py-5">
        <p className={`rounded-lg px-2 py-1 ${buttonColors[filing.status]}`}>
          {TextMyProject[filing.status]}
        </p>
      </div>
      <div className="flex items-center justify-center text-center py-5">
        หมายเหตุ
      </div>
      <div className="flex items-center justify-center text-center py-5">
        {/* add preview previous document */}
      </div>
    </div>
  );
}
