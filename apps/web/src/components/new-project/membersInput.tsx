import { FormControl, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import { Input } from "@/src/components/ui/input"
import { ChangeEventHandler } from "react"
import { Control } from "react-hook-form"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"
import { newProjectFormSchema } from "@/src/constant/schema"
import { z } from "zod"

export default function MembersInput({
  control,
  handleChange,
  index,
  handleDelete,
}: {
  control: Control<z.infer<typeof newProjectFormSchema>>
  handleChange: ChangeEventHandler<HTMLInputElement>
  handleDelete?: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void
  index: number
}) {
  return (
    <>
      <li>
        <div className="flex gap-3 items-center">
          รหัสนิสิต
          <FormField
            control={control}
            name={("members." + index) as `members.${number}`}
            render={({ field }) => (
              <FormItem className="flex gap-3 text-nowrap space-y-0 items-center">
                <FormControl>
                  <Input {...field} className="h-8" onChange={handleChange} />
                </FormControl>
                {handleDelete && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-2"
                    onClick={(e) => {
                      handleDelete(e, index)
                    }}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </li>
    </>
  )
}
