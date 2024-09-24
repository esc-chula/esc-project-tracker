'use client';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Control } from 'react-hook-form';
import { Button } from '../ui/button';
import { CircleMinus } from 'lucide-react';
import { newProjectFormSchema } from '@/src/constant/schema';
import { z } from 'zod';
import { User } from '@/src/interface/user';
import { projectFormAction } from '@/src/constant/formAction';

export default function MembersInput({
  control,
  handleChange,
  index,
  handleDelete,
  memberBeforeUpdated,
  member,
  formAction,
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
        <li>
          <div className="flex gap-3 items-center">
            <FormField
              control={control}
              name={('members.' + index) as `members.${number}`}
              render={({ field }) => (
                <FormItem
                  className={`flex gap-3 text-nowrap space-y-0 items-center ${formAction === projectFormAction.INFO && oldMember ? 'w-[85%]' : ''}`}
                >
                  {formAction === projectFormAction.INFO && oldMember ? (
                    <div className="flex text-sm text-black w-full justify-between">
                      <span>{oldMember.username}</span>
                      <span>รหัสนิสิต&emsp;{oldMember.studentId}</span>
                    </div>
                  ) : (
                    <>
                      <div> รหัสนิสิต</div>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-8 text-sm border-black"
                          onChange={handleChange}
                        />
                      </FormControl>
                    </>
                  )}
                  <>
                    {handleDelete && formAction !== projectFormAction.INFO && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="px-2"
                        onClick={(e) => {
                          handleDelete(e, index);
                        }}
                      >
                        <CircleMinus className="h-5 w-5 stroke-darkpink" />
                      </Button>
                    )}
                  </>
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
