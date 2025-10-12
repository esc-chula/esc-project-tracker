import React from 'react';

interface FormQuestionTelProps {
  field: {
    name: string;
    label: string;
    description?: string;
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: string;
  onChange?: (value: string) => void;
}

export default function FormQuestionTel({
  field,
  value,
  onChange,
}: FormQuestionTelProps) {
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

      <input
        type="tel"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={field.description || ''}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
