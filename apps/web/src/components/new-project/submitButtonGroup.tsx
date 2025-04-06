'use client';
import { FilePlus } from 'lucide-react';
import type { z } from 'zod';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { newProjectFormSchema } from '@/src/constant/schema';
import { projectFormAction } from '@/src/constant/formAction';
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

  const isUpdateDisable = useMemo(() => {
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
          className="disabled:bg-lightgray rounded-xl text-base px-4 py-2 my-6 h-9 ml-auto font-medium bg-red text-white"
        >
          <FilePlus className="h-5 w-5 mr-3" />
          เปิดโครงการ
        </Button>
      ) : null}
      {formAction === projectFormAction.UPDATE ? (
        <div className="w-full flex justify-between px-5">
          <Button
            className="my-8 rounded-lg px-6 h-12 text-black bg-transparent font-bold text-xl hover:bg-transparent"
            onClick={() => {
              changeFormActionToParent(projectFormAction.CANCEL_UPDATE);
            }}
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            className="my-8 rounded-lg px-6 h-12 bg-red font-bold text-xl"
            disabled={isUpdateDisable}
          >
            <IoCheckmarkSharp className="h-8 w-8 mr-3" />
            ยืนยัน
          </Button>
        </div>
      ) : null}
    </>
  );
}
