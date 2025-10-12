import React from 'react';

interface TimeRangeValue {
  start?: string;
  end?: string;
}

interface FormQuestionTimeRangeProps {
  field: {
    name: string;
    label: string;
    description?: string;
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: TimeRangeValue;
  onChange?: (value: TimeRangeValue) => void;
}

export default function FormQuestionTimeRange({
  field,
  value,
  onChange,
}: FormQuestionTimeRangeProps) {
  const isRequired = field.constraints?.some(
    (constraint) => constraint.rule === 'required',
  );

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
      </label>

      {field.description ? (
        <div className="text-xs text-gray-500">{field.description}</div>
      ) : null}

      <div className="flex items-center gap-2">
        <input
          type="time"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={value?.start || ''}
          onChange={(e) => {
            const currentValue = value ?? {};
            onChange?.({ ...currentValue, start: e.target.value });
          }}
        />
        <span className="text-sm text-gray-500">-</span>
        <input
          type="time"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={value?.end || ''}
          onChange={(e) => {
            const currentValue = value ?? {};
            onChange?.({ ...currentValue, end: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
