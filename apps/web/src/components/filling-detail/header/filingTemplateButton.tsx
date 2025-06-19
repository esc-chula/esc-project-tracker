import Link from 'next/link';
import { Info } from 'lucide-react';
import { Button } from '../../ui/button';

export default function FilingTemplateButton() {
  return (
    <Link
      href="https://drive.google.com/drive/folders/1re1U5LxAjUsYc3g3QMlZRWIB3zL_WctA"
      target="_blank"
    >
      <Button
        variant="ghost"
        className="text-base px-4 py-2 h-9 font-medium hover:bg-slate-200 rounded-xl transition duration-300"
      >
        <Info className="w-6 h-6 mr-2" />
        ฟอร์มเอกสาร
      </Button>
    </Link>
  );
}
