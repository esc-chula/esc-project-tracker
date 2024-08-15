'use client';
import { projectFormAction } from '@/src/constant/formAction';
import { Button } from '../ui/button';
import { FilePlus } from 'lucide-react';
import { newProjectFormSchema } from '@/src/constant/schema';
import { z } from 'zod';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { useEffect, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useState } from 'react';

export default function SubmitButtonGroup({
  formAction,
  changeFormActionToParent,
  form,
}: {
  formAction: projectFormAction;
  changeFormActionToParent: (action: projectFormAction) => void;
  form: UseFormReturn<z.infer<typeof newProjectFormSchema>>;
}) {
  const [action, setAction] = useState<projectFormAction>(formAction);

  useEffect(() => {
    setAction(formAction);
  }, [formAction]);

  const isDisabled = useMemo(
    () => form.formState.isSubmitting || !form.formState.isValid,
    [(form.formState.isSubmitting, form.formState.isValid)],
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
      {action === projectFormAction.ADMIN_CREATE ||
      action === projectFormAction.USER_CREATE ? (
        <Button
          type="submit"
          className="my-8 mx-auto rounded-lg px-6 h-12 bg-red font-bold text-xl"
          disabled={isDisabled}
        >
          <FilePlus className="h-8 w-8 mr-3" />
          เปิดโครงการ
        </Button>
      ) : null}
      {action === projectFormAction.UPDATE ? (
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
