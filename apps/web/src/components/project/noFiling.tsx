'use client';
import { HiLightBulb } from 'react-icons/hi';
import { FilePlus } from 'lucide-react';
import PopoverAddFiling from './popoverAddFiling';
import { Filing } from '@/src/interface/filing';

export default function NoFiling({
  projectId,
  setNewFilingToParent,
}: {
  projectId: string;
  setNewFilingToParent: (filing: Filing) => void;
}) {
  return (
    <div className="w-[50vw] flex flex-col items-center justify-center p-16">
      <div>
        <HiLightBulb size={200} style={{ color: 'gray', opacity: 0.7 }} />
      </div>
      <div className="text-3xl text-gray-400 font-sukhumvit text-center">
        ยังไม่มีเอกสาร <br></br>เริ่มสร้างกันเลย !
      </div>
      <div>
        <PopoverAddFiling
          addFilingToParent={(filing: Filing) => {
            setNewFilingToParent(filing);
          }}
          projectId={projectId}
        >
          <button className="bg-red text-foreground text-white px-4 py-2 rounded-lg mt-4">
            <FilePlus className="inline-block mr-3" />
            เพิ่มเอกสาร
          </button>
        </PopoverAddFiling>
      </div>
    </div>
  );
}
