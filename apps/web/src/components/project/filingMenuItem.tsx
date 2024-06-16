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
    <tr className="border-b-2 border-gray-200">
      <td className="px-8 py-5 text-nowrap">
        {filing.projectCode + "-" + filing.FilingCode}
      </td>
      <td className="p-4 py-5 text-nowrap">{filing.name}</td>
      <td className="p-4 py-5 text-nowrap">{filing.createdAt}</td>
      <td className="p-4 py-5 text-nowrap">still dont have details</td>
      <td className="p-4 py-5 text-nowrap">นิสิตผู้รับผิดชอบ have to query</td>
      <td className="p-4 py-5 text-nowrap text-center">
        <p className={`rounded-lg px-2 py-1 ${buttonColors[filing.status]}`}>
          {TextMyProject[filing.status]}
        </p>
      </td>
      <td className="p-4 py-5 text-nowrap">หมายเหตุ</td>
      <td className="p-4 py-5 text-nowrap text-center">
        <button
          className={`px-2 py-1 bg-red text-white rounded-lg ${documents.length > 0 ? "" : "cursor-not-allowed opacity-50"}`}
          onClick={handleClick}
          disabled={documents.length === 0}
        >
          อ่าน
        </button>
      </td>
    </tr>
  );
}
