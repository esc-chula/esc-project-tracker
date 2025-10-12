import React from 'react';
import FormQuestionString from './FormQuestionString';
import FormQuestionDate from './FormQuestionDate';
import FormQuestionTel from './FormQuestionTel';
import FormQuestionTimeRange from './FormQuestionTimeRange';
import FormQuestionObject from './FormQuestionObject';
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
  // Route to specific form question component based on type
  switch (field.type) {
    case 'string':
      return (
        <FormQuestionString
          field={field}
          value={value as string}
          onChange={(newValue) => onChange?.(newValue)}
        />
      );

    case 'date':
      return (
        <FormQuestionDate
          field={field}
          value={value as string}
          onChange={(newValue) => onChange?.(newValue)}
        />
      );

    case 'tel':
      return (
        <FormQuestionTel
          field={field}
          value={value as string}
          onChange={(newValue) => onChange?.(newValue)}
        />
      );

    case 'timerange':
      return (
        <FormQuestionTimeRange
          field={field}
          value={value as { start?: string; end?: string }}
          onChange={(newValue) => onChange?.(newValue)}
        />
      );

    case 'object':
      // Check if it's a multiple object with columns (table-like)
      if (field.isMultiple && field.columns) {
        return (
          <FormQuestionObject
            field={
              field as FormFieldDefinition & {
                type: 'object';
                isMultiple: true;
                columns: Record<string, FormFieldDefinition>;
              }
            }
            value={value}
            onChange={onChange}
          />
        );
      }
      return <FallBackComponent field={field} />;

    default:
      return <FallBackComponent field={field} />;
  }
}
