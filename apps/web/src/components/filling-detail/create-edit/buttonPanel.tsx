import { FileCheck, FileX, Send } from 'lucide-react';
import { Button } from '../../ui/button';

export default function ButtonPanel({
  setShowCreateDocument,
  isDisabled,
  handleAlternateSubmit,
}: {
  setShowCreateDocument?: (showCreateDocument: boolean) => void;
  isDisabled: boolean;
  handleAlternateSubmit?: () => void;
}) {
  return (
    <div className="flex flex-row justify-end text-black gap-2">
      <Button
        variant="secondary"
        onClick={() => {
          setShowCreateDocument ? setShowCreateDocument(false) : null;
        }}
        className="disabled:bg-lightgray text-base px-4 py-2 h-9 font-medium hover:bg-slate-200 rounded-xl transition duration-300"
      >
        ยกเลิก
      </Button>
      {handleAlternateSubmit ? (
        <>
          <Button
            disabled={isDisabled}
            variant="outline"
            type="button"
            onClick={handleAlternateSubmit}
            className="disabled:bg-lightgray rounded-xl text-base px-4 py-2 h-9 font-medium bg-red text-white"
          >
            <FileX className="h-5 w-5 mr-1" />
            ตีกลับ
          </Button>
          <Button
            disabled={isDisabled}
            variant="outline"
            type="submit"
            className="disabled:bg-lightgray rounded-xl text-base px-4 py-2 h-9 font-medium bg-green-600 text-white"
          >
            <FileCheck className="h-5 w-5 mr-1" />
            อนุมัติ
          </Button>
        </>
      ) : (
        <Button
          disabled={isDisabled}
          variant="outline"
          type="submit"
          className="disabled:bg-lightgray rounded-xl text-base px-4 py-2 h-9 font-medium bg-red text-white"
        >
          <Send className="h-5 w-5 mr-3" />
          ส่ง
        </Button>
      )}
    </div>
  );
}
