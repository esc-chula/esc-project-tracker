import { File } from "lucide-react";

export default function LastestItem() {
  return (
    <div className="bg-card text-card-foreground rounded-md flex flex-row py-2 px-10 space-x-5 border-2 border-black">
      <div className="flex items-center justify-center">
        <File size={40} strokeWidth={1} />
      </div>
      <div className="flex flex-col text-primary">
        <div className="font-semibold text-2xl">9090</div>
        <div className="text-xs font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-20">
          โครงกาcascsacascascascacacacacs
        </div>
      </div>
    </div>
  );
}
