'use client';
import { HiDocumentAdd } from 'react-icons/hi';
import { useState } from 'react';
import type { FilingSubType } from '@repo/shared';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import createGendoc from '@/src/service/gendoc/createGendoc';
import type { Gendoc } from '@/src/interface/gendoc';
import { toast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';

export default function PopoverAddGendoc({
  children,
  userId,
  addGendocToParent,
}: {
  children?: React.ReactNode;
  userId: string;
  addGendocToParent: (gendoc: Gendoc) => void;
}) {
  const [filingTypeAndSubType, setFilingTypeAndSubType] = useState<string>('');
  const [filingName, setFilingName] = useState<string>('');
  const [customProjectName, setCustomProjectName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  // const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    filingType: boolean;
    filingName: boolean;
    code: boolean;
    customProjectName: boolean;
  }>({
    filingType: false,
    filingName: false,
    code: false,
    customProjectName: false,
  });

  const openAddFilingPopOver = async () => {
    setOpen(!open);
    if (!open) {
      setErrors({
        filingType: false,
        filingName: false,
        code: false,
        customProjectName: false,
      });
    }
  };

  const submitCreate = async () => {
    const newErrors = {
      filingType: filingTypeAndSubType === '',
      filingName: filingName === '',
      customProjectName: customProjectName === '',
      code: code === '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const [filingType, filingSubType] = filingTypeAndSubType.split('-');
      const [projectCode, filingCode] = code.split('-');
      const data = await createGendoc(
        customProjectName,
        filingName.trim(),
        parseInt(filingType),
        userId,
        filingCode.trim(),
        filingSubType ? (filingSubType as FilingSubType) : null,
        projectCode.trim(),
      );

      addGendocToParent(data);
      toast({
        title: 'สร้างสำเร็จ',
        description: `เอกสาร ${data.projectCode} - ${data.filingCode} ถูกสร้างเรียบร้อยแล้ว`,
      });
      setOpen(false);
      setFilingName('');
      // setSelectedProjectId(projectId);
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
    <Dialog open={open} onOpenChange={openAddFilingPopOver}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="outline"
            className="hover:cursor-pointer rounded-lg px-4 py-2 bg-red text-white"
          >
            <HiDocumentAdd size={20} className="inline-block mr-2" />
            สร้างเอกสารใหม่
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างเอกสาร Gen Doc</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg pt-2 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="code" className={errors.code ? 'text-red' : ''}>
              รหัสเอกสาร
              <span className="text-red">*</span>
            </Label>
            <div>
              <Input
                id="code"
                placeholder="รหัสเอกสาร xxxx-xxxx"
                className="border-1 w-full px-4 rounded-lg border-black"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (e.target.value.trim() !== '') {
                    setErrors({ ...errors, code: false });
                  }
                }}
                required
              />
              {errors.code ? (
                <p className="text-xs text-red pt-1">กรุณากรอกรหัสเอกสาร</p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="custom-project-name"
              className={errors.customProjectName ? 'text-red' : ''}
            >
              ชื่อโครงการ (TH)
              <span className="text-red">*</span>
            </Label>
            <div>
              <Input
                id="custom-project-name"
                placeholder="ชื่อโครงการภาษาไทย"
                className="border-1 w-full px-4 rounded-lg border-black"
                value={customProjectName}
                onChange={(e) => {
                  setCustomProjectName(e.target.value);
                  if (e.target.value.trim() !== '') {
                    setErrors({ ...errors, customProjectName: false });
                  }
                }}
                required
              />
              {errors.customProjectName ? (
                <p className="text-xs text-red pt-1">กรุณากรอกชื่อโครงการ</p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="filing-type"
              className={errors.filingType ? 'text-red' : ''}
            >
              ประเภทเอกสาร
              <span className="text-red">*</span>
            </Label>
            <div>
              <Select
                value={filingTypeAndSubType}
                onValueChange={(value) => {
                  setFilingTypeAndSubType(value);
                  setErrors({ ...errors, filingType: false });
                }}
              >
                <SelectTrigger className="w-full border-1 border-black rounded-lg px-4">
                  <SelectValue placeholder="เลือกประเภทเอกสาร" />
                </SelectTrigger>
                <SelectContent>
                  {typeFilingItemsV2.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.filingType ? (
                <p className="text-xs text-red pt-1">กรุณาเลือกประเภทเอกสาร</p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="filing-name"
              className={errors.filingName ? 'text-red' : ''}
            >
              ชื่อเอกสาร
              <span className="text-red">*</span>
            </Label>
            <div>
              <Input
                id="filing-name"
                placeholder="ชื่อเอกสาร"
                className="border-1 w-full px-4 rounded-lg border-black"
                value={filingName}
                onChange={(e) => {
                  setFilingName(e.target.value);
                  if (e.target.value.trim() !== '') {
                    setErrors({ ...errors, filingName: false });
                  }
                }}
                required
              />
              {errors.filingName ? (
                <p className="text-xs text-red pt-1">กรุณากรอกชื่อเอกสาร</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-2 py-2">
            <Button
              className="disabled:bg-lightgray text-base text-gray-500 border-gray-500 border-1 bg-transparent px-4 h-10 hover:bg-slate-200 rounded-lg transition duration-300"
              onClick={() => {
                setOpen(!open);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="disabled:bg-lightgray rounded-lg text-base px-4 h-10 font-medium bg-red text-white"
              onClick={submitCreate}
            >
              <HiDocumentAdd size={20} className="inline-block mr-2" />
              สร้างเอกสาร
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
