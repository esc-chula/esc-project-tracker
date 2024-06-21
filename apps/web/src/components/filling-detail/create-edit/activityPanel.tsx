import { projectTypeMap } from "@/src/constant/Map";
import { FormControl } from "../../ui/form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export default function ActivityPanel() {
  return (
    <>
      <FormControl>
        <SelectTrigger className="w-[30vw]">
          <SelectValue placeholder="สร้าง / แก้ไขเอกสาร" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectGroup>
          {projectTypeMap.map((item, index) => (
            <SelectItem key={index} value={item.value}>
              {item.value + " - " + item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </>
  );
}
