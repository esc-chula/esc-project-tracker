'use client';
import { FilePlus } from 'lucide-react';
import type { z } from 'zod';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { projectFormAction } from '@repo/shared';
import type { newProjectFormSchema } from '@/src/constant/schema';
import { Button } from '../ui/button';

export default function SubmitButtonGroup({
  formAction,
  changeFormActionToParent,
  form,
}: {
  formAction: projectFormAction;
  changeFormActionToParent: (action: projectFormAction) => void;
  form: UseFormReturn<z.infer<typeof newProjectFormSchema>>;
}) {
  const isDisabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isValid,
    [form.formState.isSubmitting, form.formState.isValid],
  );

  const isUpdateDisabled = useMemo(() => {
    return (
      !form.formState.isValid ||
      form.formState.isSubmitting ||
      !form.formState.isDirty
    );
  }, [
    form.formState.isValid,
    form.formState.isSubmitting,
    form.formState.isDirty,
  ]);

  return (
    <>
      {formAction === projectFormAction.ADMIN_CREATE ||
      formAction === projectFormAction.USER_CREATE ? (
        <Button
          disabled={isDisabled}
          variant="outline"
          type="submit"
          className="disabled:bg-lightgray rounded-lg text-base px-4 py-2 my-6 h-9 ml-auto font-medium bg-red text-white"
        >
          <FilePlus className="h-5 w-5 mr-3" />
          เปิดโครงการ
        </Button>
      ) : null}
      {formAction === projectFormAction.UPDATE ? (
        <div className="w-full flex justify-end gap-2">
          <Button
            className="disabled:bg-lightgray text-base text-gray-500 border-gray-500 border-1 bg-transparent px-4 py-2 my-6 h-9 font-medium hover:bg-slate-200 rounded-lg transition duration-300"
            onClick={() => {
              changeFormActionToParent(projectFormAction.CANCEL_UPDATE);
            }}
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            className="disabled:bg-lightgray rounded-lg text-base px-4 py-2 my-6 h-9 font-medium bg-red text-white"
            disabled={isUpdateDisabled}
          >
            <IoCheckmarkSharp className="h-5 w-5 mr-3" />
            ยืนยัน
          </Button>
        </div>
      ) : null}
    </>
  );
}
