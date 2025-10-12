import React from 'react';

interface FallBackComponentProps {
  field: {
    name: string;
    label: string;
    description?: string;
    type: string;
    constraints?: { rule: string; args?: unknown; message?: string }[];
    isMultiple?: boolean;
  };
}

export default function FallBackComponent({ field }: FallBackComponentProps) {
  return (
    <div className="rounded-md p-3 text-center bg-gray-100">
      <div className="text-sm text-yellow-700">
        ⚠️ Unsupported field type:{' '}
        <code className="font-mono bg-white px-1 rounded">{field.type}</code>
      </div>
      <div className="text-xs text-yellow-600 mt-1">
        This field type is not yet implemented
      </div>
    </div>
  );
}
