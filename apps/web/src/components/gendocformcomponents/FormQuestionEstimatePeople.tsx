import React from 'react';

interface EstimatePeopleValue {
  staff?: number;
  participants?: number;
  [key: string]: number | undefined;
}

interface FormQuestionEstimatePeopleProps {
  field: {
    name: string;
    label: string;
    description?: string;
    type: 'estimate-people';
    variant: 'staff' | 'participants';
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: EstimatePeopleValue;
  onChange?: (value: EstimatePeopleValue) => void;
}

/**
 * FormQuestionEstimatePeople - Component for estimating number of people
 * Variants: staff, participants
 * TODO: Style according to the design picture provided
 */
export default function FormQuestionEstimatePeople({
  field,
  value,
  onChange,
}: FormQuestionEstimatePeopleProps) {
  const isRequired = field.constraints?.some(
    (constraint) => constraint.rule === 'required',
  );

  // TODO: Implement different layouts for staff vs participants variants
  const renderStaffVariant = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* TODO: Add specific staff categories */}
        <div>
          <label
            htmlFor="staff"
            className="block text-xs font-medium text-gray-600 mb-1"
          >
            จำนวนเจ้าหน้าที่
          </label>
          <input
            type="number"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={value?.staff || ''}
            onChange={(e) =>
              onChange?.({ ...value, staff: parseInt(e.target.value) || 0 })
            }
          />
        </div>
      </div>
    );
  };

  const renderParticipantsVariant = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {/* TODO: Add specific participant categories */}
        <div>
          <label
            htmlFor="participant"
            className="block text-xs font-medium text-gray-600 mb-1"
          >
            จำนวนผู้เข้าร่วม
          </label>
          <input
            type="number"
            min="0"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            value={value?.participants || ''}
            onChange={(e) =>
              onChange?.({
                ...value,
                participants: parseInt(e.target.value) || 0,
              })
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
      </label>

      {field.description ? (
        <div className="text-xs text-gray-500">{field.description}</div>
      ) : null}

      <div className="rounded-lg border p-4">
        {/* TODO: Style this container to match the design picture */}
        {field.variant === 'staff'
          ? renderStaffVariant()
          : renderParticipantsVariant()}
      </div>
    </div>
  );
}
