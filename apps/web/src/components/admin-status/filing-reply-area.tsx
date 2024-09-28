import { FaFolderOpen } from 'react-icons/fa6';

export default function FilingReplyArea({
  selectedFilingId,
}: {
  selectedFilingId: string;
}) {
  return (
    <div className="h-[80vh] w-[50vw] pl-15 overflow flex justify-center">
      {selectedFilingId === '' ? (
        <div className="h-full items-center flex flex-col justify-center text-3xl text-gray-300 space-y-2">
          <FaFolderOpen size={100} />
          <div className="text-center">
            เลือกเอกสารที่<br></br>ต้องการดำเนินการ
          </div>
        </div>
      ) : (
        <div>Selected Filing ID: {selectedFilingId}</div>
      )}
    </div>
  );
}
