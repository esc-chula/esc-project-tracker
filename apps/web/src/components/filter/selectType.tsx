'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { useEffect, useState } from 'react';

export default function SelectType({
  title,
  items,
  sendValue,
  selectedValue,
}: {
  title: string;
  items: { value: string | number; label: string }[];
  sendValue: (value: string) => void;
  selectedValue?: string;
}) {
  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    if (selectedValue) {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

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
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value.toString()}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
