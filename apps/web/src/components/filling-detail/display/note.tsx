import { CollapsibleContent } from '../../ui/collapsible';
import TextareaForDisplay from './textareaForDisplay';

export default function Note({ note }: { note: string }) {
  return (
    <CollapsibleContent>
      <div className="border-t-2 px-8 py-4 font-bold space-y-4">
        <div>หมายเหตุ</div>
        <TextareaForDisplay value={note} />
      </div>
    </CollapsibleContent>
  );
}
