import { DocumentActivityMapForUser, projectTypeMap } from "@/src/constant/Map";
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
          <SelectValue placeholder={DocumentActivityMapForUser[0].label} />
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
