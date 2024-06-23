import { CollapsibleContent } from "../../ui/collapsible";

export default function Note({ note }: { note: string }) {
  return (
    <CollapsibleContent>
      <div className="border-t-2 px-8 py-4 font-bold space-y-4">
        <div>หมายเหตุ</div>
        <textarea
          className="w-full bg-white rounded-lg min-h-[15vh] p-5 font-normal break-words resize-none text-sm text-gray-600 font-sukhumvit"
          defaultValue={note}
        ></textarea>
      </div>
    </CollapsibleContent>
  );
}
