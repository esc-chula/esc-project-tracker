import type { Row } from '@tanstack/react-table';
import { BiSolidFilePdf } from 'react-icons/bi';
import type { MouseEvent } from 'react';
import { FilingStatus } from '@/src/constant/enum';
import type { Filing } from '@/src/interface/filing';
import getUrlToFile from '@/src/service/aws/getUrlToFile';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';

export default function PDFButton({ row }: { row: Row<Filing> }) {
  const handleClick = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string,
    folderName: string,
  ) => {
    e.stopPropagation();
    const latestDocument = await findLatestDocumentByFilingId(id);
    console.log(latestDocument);

    const signedUrl = await getUrlToFile({
      fileName: latestDocument?.pdfName ?? '',
      folderName,
    });
    window.open(signedUrl, '_blank');
  };

  return (
    <button
      type="button"
      onClick={(e) => {
        void handleClick(e, row.original.id, row.getValue('detailsPath'));
      }}
      className={`w-6 mx-2 text-red ${row.getValue('status') !== FilingStatus.DRAFT && row.getValue('status') !== FilingStatus.DOCUMENT_CREATED ? ' cursor-pointer' : 'opacity-50 pointer-events-none'}`}
    >
      <BiSolidFilePdf size={24} />
    </button>
  );
}
