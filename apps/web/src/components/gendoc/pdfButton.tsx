import type { Row } from '@tanstack/react-table';
import { BiSolidFilePdf } from 'react-icons/bi';
import type { MouseEvent } from 'react';
import getUrlToFile from '@/src/service/aws/getUrlToFile';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';
import type { Gendoc } from '@/src/interface/gendoc';

export default function PDFButton({ row }: { row: Row<Gendoc> }) {
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
      // Fix disable button logic
      className={`w-6 mx-2 text-red ${row.getValue('detailsPath') ? ' cursor-pointer' : 'opacity-50 pointer-events-none'}`}
    >
      <BiSolidFilePdf size={24} />
    </button>
  );
}
