import React, { useState } from 'react';
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

interface FormSectionProps {
  title: string;
  fields: Record<string, FormFieldDefinition>;
  values?: Record<string, unknown>;
  onChange?: (fieldName: string, value: unknown) => void;
}

export default function FormSection({
  title,
  fields,
  values = {},
  onChange,
}: FormSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section className="rounded-xl bg-white p-4 md:p-5">
      <header
        className="mb-4 flex items-center justify-between cursor-pointer"
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <button
          type="button"
          className="rounded-lg p-1 hover:bg-gray-100 transition-colors"
          aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
        >
          <svg
            className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </header>

      {isExpanded ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(fields).map(([fieldName, field]) => (
            <div
              key={fieldName}
              className={
                field.type === 'object' && field.isMultiple
                  ? 'md:col-span-2'
                  : ''
              }
            >
              <FormQuestion
                field={field}
                value={values[fieldName]}
                onChange={(value) => onChange?.(fieldName, value)}
              />
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
