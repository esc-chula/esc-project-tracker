import { FilingStatus } from "@/src/constant/enum";
import { documentType } from "@/src/interface/document";
import { FilingType } from "@/src/interface/filing";
import findDocumentsByFilingId from "@/src/service/findDocumentsByFilingId";
import { TextMyProject, buttonColors } from "@/src/styles/enumMap";
import { useState } from "react";

export default function FilingMenuItem({
  filing,
  index,
}: {
  filing: FilingType;
  index: number;
}) {
  const [documents, setDocuments] = useState<documentType[]>([]);
  const getLatestDocument = async () => {
    try {
      const docs = await findDocumentsByFilingId(filing.id);
      if (docs.length) setDocuments(docs);
    } catch (e) {
      console.log(e);
      throw new Error("get doc failed");
    }
  };
  const handleClick = () => {
    window.open(documents[0].pdfLink, "_blank");
  };
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
        <button
          className={`px-2 py-1 bg-red text-white rounded-lg ${documents.length > 0 ? "" : "cursor-not-allowed opacity-50"}`}
          onClick={handleClick}
          disabled={documents.length === 0}
        >
          อ่าน
        </button>
      </div>
    </div>
  );
}
