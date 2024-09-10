import {
  DocumentActivityMapForAdmin,
  DocumentActivityMapForUser,
} from '@/src/constant/Map';
import { FormControl } from '../../ui/form';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

export default function ActivityPanel({
  isAdmin = false,
}: {
  isAdmin?: boolean;
}) {
  return (
    <>
      <FormControl>
        <SelectTrigger className="border-2 rounded-lg w-[38vw] p-4">
          <SelectValue
            placeholder={
              isAdmin ? 'ตอบกลับหรือแก้ไขเอกสาร' : 'สร้างหรือแก้ไขเอกสาร'
            }
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {isAdmin
            ? DocumentActivityMapForAdmin.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))
            : DocumentActivityMapForUser.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </>
  );
}
