import Link from 'next/link';
import { BiSolidFilePdf } from 'react-icons/bi';
import { FaFile } from 'react-icons/fa6';

export default function FileDisplay({
  fileName,
  fileType,
  link,
}: {
  fileName: string;
  fileType: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <div className="w-60 bg-white border-black p-2 rounded-lg border-2 flex space-x-2 items-center hover:scale-105 transition duration-300 hover:cursor-pointer">
        {fileType === 'pdf' ? (
          <BiSolidFilePdf size={20} className="text-red" />
        ) : (
          <FaFile size={20} style={{ color: 'skyblue' }} />
        )}
        <div className="text-xxs text-start">
          <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-[10vw] ">
            {fileName}
          </div>
          <div className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis w-[10vw]">
            .{fileType}
          </div>
        </div>
      </div>
    </Link>
  );
}
