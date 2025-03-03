'use client';
import { HiDocumentAdd } from 'react-icons/hi';
import { useState } from 'react';
import createFiling from '@/src/service/filing/createFiling';
import type { Filing } from '@/src/interface/filing';
import { getUserId } from '@/src/service/auth';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import type { FilingSubType } from '@/src/constant/enum';
import { toast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function PopoverAddFiling({
  children,
  projectId,
  addFilingToParent,
}: {
  children?: React.ReactNode;
  projectId: string;
  addFilingToParent: (filing: Filing) => void;
}) {
  const [filingTypeAndSubType, setFilingTypeAndSubType] = useState<string>('0');
  const [filingName, setFilingName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const submitCreate = async () => {
    try {
      const userId = await getUserId();
      const [filingType, filingSubType] = filingTypeAndSubType.split('-');
      if (filingName !== '') {
        const data = await createFiling(
          projectId,
          filingName,
          parseInt(filingType),
          userId,
          filingSubType ? (filingSubType as FilingSubType) : null,
        );

        addFilingToParent(data);
        toast({
          title: 'สร้างสำเร็จ',
          description: `เอกสาร ${data.projectCode} - ${data.filingCode} ถูกสร้างเรียบร้อยแล้ว`,
        });
        setOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'ไม่สำเร็จ',
          description: error.message,
          isError: true,
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <div className="flex items-center text-red hover:cursor-pointer">
            <HiDocumentAdd size={30} />
          </div>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>เอกสารใหม่</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg space-y-7">
          <input
            type="text"
            placeholder="ชื่อเอกสาร"
            className="border-black border-2 w-full p-2 rounded-lg"
            value={filingName}
            onChange={(e) => {
              setFilingName(e.target.value.trim());
            }}
            required
          />

          <div className="font-sukhumvit font-semibold">
            ประเภทเอกสาร *
            <select
              id="documentType"
              className="border-black border-2 w-full p-2 rounded-lg"
              defaultValue="0"
              value={filingTypeAndSubType}
              onChange={(e) => {
                setFilingTypeAndSubType(e.target.value);
              }}
            >
              {typeFilingItemsV2.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-end">
            <button
              type="submit"
              className="bg-red text-white rounded-lg py-1 px-4 font-sukhumvit font-semibold"
              onClick={submitCreate}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
