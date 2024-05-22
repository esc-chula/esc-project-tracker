import { File } from "lucide-react";

export default function LastestItem({
  projectCode,
  projectName,
}: {
  projectCode: string;
  projectName: string;
}) {
  return (
    <div className="bg-card text-card-foreground rounded-md flex flex-row py-2 px-8 space-x-5 border-2 border-black">
      <div className="flex items-center justify-center">
        <File size={30} strokeWidth={1} />
      </div>
      <div className="font-semibold text-xl text-foreground">
        {projectCode}
        <div className="text-xs font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-20">
          {projectName}
        </div>
      </div>
    </div>
  );
}