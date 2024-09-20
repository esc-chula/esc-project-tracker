'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { HiDocumentAdd } from 'react-icons/hi';
import { filingTypeMap } from '@/src/constant/Map';
import { useEffect, useState } from 'react';
import createFiling from '@/src/service/filing/createFiling';
import { FilingType } from '@/src/interface/filing';
import { useToast } from '../ui/use-toast';
import { getUserId } from '@/src/service/auth';

export default function PopoverAddDocument({
  children,
  projectId,
  addFilingToParent,
}: {
  children?: React.ReactNode;
  projectId: string;
  addFilingToParent: (filing: FilingType) => void;
}) {
  const [filingType, setFilingType] = useState<number>(0);
  const [filingName, setFilingName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getUserId();
      setUserId(userId);
    };
    fetchUserId();
  },[]);

  const submitCreate = async () => {
    try {
      if (filingName !== '') {
        const data = await createFiling(
          projectId,
          filingName,
          filingType,
          userId,
        );

        addFilingToParent(data);
        toast({
          title: 'สร้างสำเร็จ',
          description: `เอกสาร ${data.projectCode} - ${data.FilingCode} ถูกสร้างเรียบร้อยแล้ว`,
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
          ></input>

          <div className="font-sukhumvit font-semibold">
            ประเภทเอกสาร *
            <select
              id="documentType"
              className="border-black border-2 w-full p-2 rounded-lg"
              defaultValue={0}
              value={filingType}
              onChange={(e) => {
                setFilingType(parseInt(e.target.value));
              }}
            >
              {filingTypeMap.map((type) => (
                <option value={type.value} key={type.value}>
                  {type.value.toString()}
                  {'  '} {type.label}
                </option>
              ))}
            </select>
          </div>
          <div className="text-end">
            <button
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
