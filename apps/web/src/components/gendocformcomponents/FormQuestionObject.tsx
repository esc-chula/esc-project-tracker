import React from 'react';
import FormQuestion from './FormQuestion';

interface FormFieldDefinition {
  name: string;
  label: string;
  description?: string;
  type: string;
  constraints?: { rule: string; args?: unknown; message?: string }[];
  isMultiple?: boolean;
  columns?: Record<string, FormFieldDefinition>;
}

interface FormQuestionObjectProps {
  field: FormFieldDefinition & {
    type: 'object';
    isMultiple: true;
    columns: Record<string, FormFieldDefinition>;
  };
  value?: unknown;
  onChange?: (value: unknown) => void;
}

export default function FormQuestionObject({
  field,
  value,
  onChange,
}: FormQuestionObjectProps) {
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

      <div className="space-y-4">
        <div className="rounded-lg border p-4">
          <div className="mb-3 text-sm font-medium">Table Data</div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(field.columns).map(([key, columnField]) => (
              <div key={key} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">
                  {columnField.label}
                </label>
                <FormQuestion field={columnField} />
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 rounded-md border border-blue-300 bg-blue-50 px-3 py-1 text-sm text-blue-700 hover:bg-blue-100"
          >
            + Add Row
          </button>
        </div>
      </div>
    </div>
  );
}
