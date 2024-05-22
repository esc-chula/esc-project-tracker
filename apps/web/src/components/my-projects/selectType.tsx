import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export default function SelectType({ title }: { title: string }) {
  return (
    <Select>
      <SelectTrigger className="rounded-full border-black h-8 w-auto space-x-2 text-sm focus:shadow-none focus:outline-none">
        <SelectValue
          placeholder={title}
          className="focus:outline-none focus:shadow-none"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">ประเภท1</SelectItem>
        <SelectItem value="dark">ประเภท2</SelectItem>
        <SelectItem value="system">ประเภท3</SelectItem>
      </SelectContent>
    </Select>
  );
}
