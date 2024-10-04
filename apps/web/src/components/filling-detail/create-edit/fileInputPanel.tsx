import { ArrowUpFromLine } from 'lucide-react';
import { FormControl } from '../../ui/form';
import { UseFormRegisterReturn } from 'react-hook-form';
import FileDisplay from '../display/fileDisplay';

export default function FileInputPanel({
  fileRef,
  fileList,
  fileName, // case โชว์ว่าเคยมีไฟล์ใน input
  fileType, // case โชว์ว่าเคยมีไฟล์ใน input
}: {
  fileRef: UseFormRegisterReturn<'file'>;
  fileList: FileList | undefined;
  fileName?: string | null;
  fileType?: string | null;
}) {
  return (
    <FormControl className="flex-grow">
      <div className="relative flex flex-col w-full items-center justify-center px-6 py-2 border-4 border-dashed border-gray-300 text-center cursor-pointer rounded-lg hover:bg-gray-100 bg-white">
        {/* If have file show file name*/}
        {fileList && fileList.length ? (
          <div className="flex flex-col space-y-2 h-full justify-around">
            {Array.from(fileList).map((file, index) => (
              <div key={index}>
                <FileDisplay
                  fileName={file.name}
                  fileType={file.name.split('.').pop() ?? ''}
                />
              </div>
            ))}
          </div>
        ) : fileName && fileType ? (
          <FileDisplay fileName={fileName} fileType={fileType} />
        ) : (
          <div className="h-full items-center flex py-4">
            <ArrowUpFromLine className="h-10 w-10 text-gray-400 " />
          </div>
        )}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          multiple
          {...fileRef}
          className="absolute inset-0 w-full min-h-full opacity-0 cursor-pointer"
        />
      </div>
    </FormControl>
  );
}
