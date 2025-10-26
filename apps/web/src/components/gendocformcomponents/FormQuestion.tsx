import React from 'react';
import FormQuestionString from './FormQuestionString';
import FormQuestionStringShort from './FormQuestionStringShort';
import FormQuestionStringLong from './FormQuestionStringLong';
import FormQuestionDate from './FormQuestionDate';
import FormQuestionTel from './FormQuestionTel';
import FormQuestionTimeRange from './FormQuestionTimeRange';
import FormQuestionObject from './FormQuestionObject';
import FormQuestionEstimatePeople from './FormQuestionEstimatePeople';
import FormQuestionString2Part from './FormQuestionString2Part';
import FallBackComponent from './FallBackComponent';

interface FormFieldDefinition {
  name: string;
  label: string;
  description?: string;
  type: string;
  constraints?: { rule: string; args?: unknown; message?: string }[];
  isMultiple?: boolean;
  columns?: Record<string, FormFieldDefinition>;
  variant?: 'staff' | 'participants'; // For estimate-people type
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

    case 'string-short':
      return (
        <FormQuestionStringShort
          field={field}
          value={value as string}
          onChange={(newValue) => onChange?.(newValue)}
        />
      );

    case 'string-long':
      return (
        <FormQuestionStringLong
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

    case 'estimate-people':
      return (
        <FormQuestionEstimatePeople
          field={
            field as {
              name: string;
              label: string;
              description?: string;
              type: 'estimate-people';
              variant: 'staff' | 'participants';
              constraints?: {
                rule: string;
                args?: unknown;
                message?: string;
              }[];
            }
          }
          value={
            value as
              | {
                  staff?: number;
                  participants?: number;
                  [key: string]: number | undefined;
                }
              | undefined
          }
          onChange={onChange}
        />
      );

    case 'string-2part':
      return (
        <FormQuestionString2Part
          field={
            field as {
              name: string;
              label: string;
              description?: string;
              type: 'string-2part';
              isMultiple: true;
              constraints?: {
                rule: string;
                args?: unknown;
                message?: string;
              }[];
            }
          }
          value={
            value as
              | { id: string; topic: string; description: string }[]
              | undefined
          }
          onChange={onChange}
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
