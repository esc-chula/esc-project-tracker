import React from 'react';
import FallBackComponent from './FallBackComponent';

interface FormFieldDefinition {
  name: string;
  label: string;
  description?: string;
  type: string;
  constraints?: { rule: string; args?: unknown; message?: string }[];
  isMultiple?: boolean;
  columns?: Record<string, FormFieldDefinition>;
}

interface FormQuestionProps {
  field: FormFieldDefinition;
  value?: unknown;
  onChange?: (value: unknown) => void;
}

export default function FormQuestion({
  field,
  value,
  onChange,
}: FormQuestionProps) {
  const renderInput = () => {
    switch (field.type) {
      case 'string':
        return (
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={field.description || ''}
            value={(value as string) || ''}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={(value as string) || ''}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder={field.description || ''}
            value={(value as string) || ''}
            onChange={(e) => onChange?.(e.target.value)}
          />
        );

      case 'timerange':
        return (
          <div className="flex items-center gap-2">
            <input
              type="time"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={(value as { start?: string } | undefined)?.start || ''}
              onChange={(e) => {
                const currentValue =
                  (value as { start?: string; end?: string } | undefined) ?? {};
                onChange?.({ ...currentValue, start: e.target.value });
              }}
            />
            <span className="text-sm text-gray-500">-</span>
            <input
              type="time"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={(value as { end?: string } | undefined)?.end || ''}
              onChange={(e) => {
                const currentValue =
                  (value as { start?: string; end?: string } | undefined) ?? {};
                onChange?.({ ...currentValue, end: e.target.value });
              }}
            />
          </div>
        );

      case 'object':
        if (field.isMultiple && field.columns) {
          return (
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
          );
        }
        return <FallBackComponent field={field} />;

      default:
        return <FallBackComponent field={field} />;
    }
  };

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

      {renderInput()}
    </div>
  );
}
