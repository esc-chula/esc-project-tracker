import type { Row } from '@tanstack/react-table';
import { BiSolidFilePdf } from 'react-icons/bi';
import { FilingStatus } from '@/src/constant/enum';
import type { FilingType } from '@/src/interface/filing';
import getUrlToFile from '@/src/service/aws/getUrlToFile';
import findLatestDocumentByFilingId from '@/src/service/document/findLatestDocumentByFilingId';

export default function PDFButton({ row }: { row: Row<FilingType> }) {
  const handleClick = async (id: string, folderName: string) => {
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
      onClick={() => {
        void handleClick(row.original.id, row.getValue('detailsPath'));
      }}
      className={`w-6 text-red ${row.getValue('status') !== FilingStatus.DRAFT && row.getValue('status') !== FilingStatus.DOCUMENT_CREATED ? ' cursor-pointer' : 'opacity-50 pointer-events-none'}`}
    >
      <BiSolidFilePdf size={24} />
    </button>
  );
}
