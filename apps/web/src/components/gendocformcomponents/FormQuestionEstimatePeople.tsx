import React from 'react';

interface EstimatePeopleValue {
  year1?: number;
  year2?: number;
  year3?: number;
  year4?: number;
  teacher?: number;
  officer?: number;
  external?: number;
  [key: string]: number | undefined;
}

interface FormQuestionEstimatePeopleProps {
  field: {
    name: string;
    label: string;
    description?: string;
    type: 'estimate-people';
    variant: 'staff' | 'participants';
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: EstimatePeopleValue;
  onChange?: (value: EstimatePeopleValue) => void;
}

export default function FormQuestionEstimatePeople({
  field,
  value = {},
  onChange,
}: FormQuestionEstimatePeopleProps) {
  const isRequired = field.constraints?.some((c) => c.rule === 'required');

  const PeopleCountField = ({
    k,
    label,
    val,
  }: {
    k: string;
    label: string;
    val?: number;
  }) => (
    <div
      className="
        grid w-full text-xs gap-1
        grid-cols-1 sm:grid-cols-1
        lg:grid-cols-[max-content_auto]
        items-start lg:items-center
      "
    >
      <span className="whitespace-nowrap">{label}</span>

      <div className="inline-flex items-center gap-2 justify-self-end sm:justify-self-start w-full sm:w-full lg:w-[6rem]">
        <input
          id={k}
          type="number"
          inputMode="numeric"
          min="0"
          className="w-full rounded-xl border border-gray-300 bg-white p-2 outline-none transition focus:border-gray-400"
          placeholder="จำนวน"
          value={val ?? ''}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === '') return onChange?.({ ...value, [k]: undefined });
            const parsed = Number.parseInt(raw, 10);
            onChange?.({
              ...value,
              [k]: Number.isNaN(parsed) ? undefined : Math.max(0, parsed),
            });
          }}
        />
        <span>คน</span>
      </div>
    </div>
  );

  const PeopleEstimateAll = () => {
    const leftLabel =
      field.variant === 'staff' ? 'ผู้ปฏิบัติงาน :' : 'ผู้เข้าร่วม :';

    const base = [
      { k: 'year1', l: 'นิสิตชั้นปีที่ 1' },
      { k: 'year2', l: 'นิสิตชั้นปีที่ 2' },
      { k: 'year3', l: 'นิสิตชั้นปีที่ 3' },
      { k: 'year4', l: 'นิสิตชั้นปีที่ 4' },
      { k: 'teacher', l: 'อาจารย์' },
      { k: 'officer', l: 'เจ้าหน้าที่' },
    ];

    const items =
      field.variant === 'participants'
        ? [...base, { k: 'external', l: 'บุคคลภายนอก' } as const]
        : base;

    return (
      <div className="grid grid-cols-[max-content_1fr] items-start gap-x-4">
        <div className="pt-2 text-xs">{leftLabel}</div>

        <div className="grid grid-cols-4 gap-x-6 gap-y-3">
          {items.map(({ k, l }) => (
            <PeopleCountField key={k} k={k} label={l} val={value[k]} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-800">
        {field.label}
        {isRequired && <span className="ml-1 text-red-500">*</span>}
      </label>

      {field.description && (
        <p className="text-xs text-gray-500">{field.description}</p>
      )}

      <PeopleEstimateAll />
    </div>
  );
}
