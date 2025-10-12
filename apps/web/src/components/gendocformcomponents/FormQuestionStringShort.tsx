import React from 'react';

interface FormQuestionStringShortProps {
  field: {
    name: string;
    label: string;
    description?: string;
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: string;
  onChange?: (value: string) => void;
}

/**
 * FormQuestionStringShort - Half width text input component
 * Used for shorter form fields like "ชื่อโครงการ (ภาษาอังกฤษ)"
 * Width: w-1/2
 */
export default function FormQuestionStringShort({
  field,
  value,
  onChange,
}: FormQuestionStringShortProps) {
  const isRequired = field.constraints?.some(
    (constraint) => constraint.rule === 'required',
  );

  return (
    <div className="space-y-2 w-full">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
      </label>

      {field.description ? (
        <div className="text-xs text-gray-500">{field.description}</div>
      ) : null}

      {/* TODO: Style this input to match Figma design */}
      <input
        type="text"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder={field.description || ''}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
