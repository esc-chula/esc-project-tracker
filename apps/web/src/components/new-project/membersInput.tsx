'use client';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';
import type { Control } from 'react-hook-form';
import { CircleMinus } from 'lucide-react';
import type { z } from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import type { newProjectFormSchema } from '@/src/constant/schema';
import type { User } from '@/src/interface/user';
import { projectFormAction } from '@/src/constant/formAction';
import { Button } from '../ui/button';

export default function MembersInput({
  control,
  handleChange,
  index,
  handleDelete,
  memberBeforeUpdated,
  member,
  formAction,
  key,
}: {
  control: Control<z.infer<typeof newProjectFormSchema>>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleDelete?: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => void;
  index: number;
  memberBeforeUpdated: User[];
  member: string;
  formAction: projectFormAction;
  key: string;
}) {
  const [oldMember, setOldMember] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (memberBeforeUpdated.length > 0) {
      const updatedOldMember = memberBeforeUpdated.find(
        (user) => user.studentId === member,
      );
      setOldMember(updatedOldMember);
    }
  }, [member]);
  return (
    <>
      {formAction === projectFormAction.INFO && !oldMember ? null : (
        <li key={key}>
          <div className="flex items-center">
            <FormField
              control={control}
              name={`members.${index}`}
              render={({ field }) => (
                <FormItem
                  className={`flex gap-3 text-nowrap space-y-0 items-center ${formAction === projectFormAction.INFO && oldMember ? 'w-full' : ''}`}
                >
                  {formAction === projectFormAction.INFO && oldMember ? (
                    <div className="flex text-sm text-black w-full gap-6 justify-between">
                      <span>{oldMember.username}</span>
                      {/* <span>รหัสนิสิต&emsp;{oldMember.studentId}</span> */}
                    </div>
                  ) : (
                    <>
                      <FormLabel>รหัสนิสิต</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-8 text-sm border-black"
                          onChange={(e) => {
                            field.onChange(e);
                            handleChange(e);
                          }}
                        />
                      </FormControl>
                    </>
                  )}
                  {handleDelete && formAction !== projectFormAction.INFO ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-2 h-8"
                      onClick={(e) => {
                        handleDelete(e, index);
                      }}
                    >
                      <CircleMinus className="h-5 w-5 stroke-darkpink" />
                    </Button>
                  ) : null}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </li>
      )}
    </>
  );
}
