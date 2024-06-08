"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";

export default function SelectType({
  title,
  items,
  sendValue,
}: {
  title: string;
  items: { value: string | number; label: string }[];
  sendValue: (value: string) => void;
}) {
  const [selected, setSelected] = useState<string>("");
  return (
    <Select
      value={selected}
      onValueChange={(value) => {
        setSelected(value);
        sendValue(value);
      }}
    >
      <SelectTrigger className="rounded-full border-black h-8 w-auto space-x-2 text-sm focus:shadow-none text-ellipsis max-w-60">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">ทั้งหมด</SelectItem>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value.toString()}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
