import React from 'react';

interface FormQuestionStringLongProps {
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
 * FormQuestionStringLong - Full width text input component
 * Used for longer form fields like "หลักการและเหตุผล"
 * Width: w-full
 * Can be textarea for multi-line content
 */
export default function FormQuestionStringLong({
  field,
  value,
  onChange,
}: FormQuestionStringLongProps) {
  const isRequired = field.constraints?.some(
    (constraint) => constraint.rule === 'required',
  );

  return (
    <div className="space-y-2 w-full col-span-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
      </label>

      {field.description ? (
        <div className="text-xs text-gray-500">{field.description}</div>
      ) : null}

      {/* TODO: Decide if this should be textarea for long content */}
      {/* TODO: Style this input to match Figma design */}
      <textarea
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
        placeholder={field.description || ''}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        rows={4}
      />
    </div>
  );
}
