import { DocumentActivityMapForUser } from '@/src/constant/Map';
import { FormControl } from '../../ui/form';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';

export default function ActivityPanel() {
  return (
    <>
      <FormControl>
        <SelectTrigger className="border-2 rounded-lg w-[38vw] p-4">
          <SelectValue placeholder="สร้างหรือแก้ไขเอกสาร" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {DocumentActivityMapForUser.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
          {/* TODO: DocumentActivityMapForAdmin */}
        </SelectGroup>
      </SelectContent>
    </>
  );
}
