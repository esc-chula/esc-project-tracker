import { Document } from "@/src/interface/document";
import { Filing } from "@/src/interface/filing";
import findDocumentsByFilingId from "@/src/service/findDocumentsByFilingId";
import { TextMyProject, buttonColors } from "@/src/styles/enumMap";
import { useEffect, useState } from "react";

export default function FilingMenuItem({ filing }: { filing: Filing }) {
  const [documents, setDocuments] = useState<Document[]>([]);
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
  useEffect(() => {
    getLatestDocument();
  }, []);
  return (
    <tr className="border-b-2 border-gray-200">
      <td className="p-4 py-5 text-nowrap text-center min-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {filing.projectCode + "-" + filing.FilingCode}
      </td>
      <td className="p-4 py-5 text-nowrap max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        {filing.name}
      </td>
      <td className="p-4 py-5 text-nowrap text-center">
        {filing.createdAt.slice(0, 10)}
      </td>
      <td className="p-4 py-5 text-nowrap text-center max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
        {documents.length > 0 ? documents[0].detail : "-"}
      </td>
      <td className="p-4 py-5 text-nowrap text-center max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
        sarunpat aiyimaphan
      </td>
      <td className="p-4 py-5 text-nowrap text-center">
        <p className={`rounded-lg px-2 py-1 ${buttonColors[filing.status]}`}>
          {TextMyProject[filing.status]}
        </p>
      </td>
      <td className="p-4 py-5 text-nowrap text-center max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
        หมายเหตุ
      </td>
      <td className="p-4 py-5 text-nowrap text-center w-[60px]">
        <button
          className={`px-2 py-1 bg-red text-white hover:bg-white hover:text-red rounded-lg ${documents.length > 0 ? "" : "cursor-not-allowed opacity-50"}`}
          onClick={handleClick}
          disabled={documents.length === 0}
        >
          อ่าน
        </button>
      </td>
    </tr>
  );
}
