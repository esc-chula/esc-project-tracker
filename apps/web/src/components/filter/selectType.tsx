'use client';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

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
      <SelectTrigger className="h-8 text-base rounded-2xl px-4 py-2 gap-2 bg-secondary border-0 max-w-36">
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
