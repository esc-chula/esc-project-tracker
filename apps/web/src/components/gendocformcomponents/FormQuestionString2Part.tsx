import React, { useEffect } from 'react';

interface String2PartItem {
  id: string;
  topic: string;
  description: string;
}

interface FormQuestionString2PartProps {
  field: {
    name: string;
    label: string;
    description?: string;
    type: 'string-2part';
    isMultiple: true;
    constraints?: { rule: string; args?: unknown; message?: string }[];
  };
  value?: String2PartItem[];
  onChange?: (value: String2PartItem[]) => void;
}

/**
 * FormQuestionString2Part - Component with topic + description pairs
 * Supports multiple rows with add/remove functionality
 * Each row has sequential numbering
 */
export default function FormQuestionString2Part({
  field,
  value = [],
  onChange,
}: FormQuestionString2PartProps) {
  const isRequired = field.constraints?.some(
    (constraint) => constraint.rule === 'required',
  );

  const addRow = () => {
    const newItem: String2PartItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      topic: '',
      description: '',
    };
    const newValue = [...value, newItem];
    onChange?.(newValue);
  };

  const removeRow = (id: string) => {
    const newValue = value.filter((item) => item.id !== id);
    onChange?.(newValue);
  };

  const updateRow = (
    id: string,
    fieldName: 'topic' | 'description',
    newValue: string,
  ) => {
    const updatedValue = value.map((item) =>
      item.id === id ? { ...item, [fieldName]: newValue } : item,
    );
    onChange?.(updatedValue);
  };

  // Initialize with one row if empty
  useEffect(() => {
    if (value.length === 0 && onChange) {
      const newItem: String2PartItem = {
        id: `item-${Date.now()}-${Math.random()}`,
        topic: '',
        description: '',
      };
      onChange([newItem]);
    }
  }, [value.length, onChange]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {field.label}
        {isRequired ? <span className="text-red-500 ml-1">*</span> : null}
      </label>

      {field.description ? (
        <div className="text-xs text-gray-500">{field.description}</div>
      ) : null}

      <div className="space-y-3">
        {value.map((item, index) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-4 border rounded-lg"
          >
            {/* TODO: Style the numbering */}
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
              {index + 1}
            </div>

            <div className="flex-1 space-y-3">
              {/* Topic input */}
              <div>
                <label
                  htmlFor={`topic-${item.id}`}
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  หัวข้อ
                </label>
                <input
                  id={`topic-${item.id}`}
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="ระบุหัวข้อ..."
                  value={item.topic}
                  onChange={(e) => {
                    updateRow(item.id, 'topic', e.target.value);
                  }}
                />
              </div>

              {/* Description input */}
              <div>
                <label
                  htmlFor={`description-${item.id}`}
                  className="block text-xs font-medium text-gray-600 mb-1"
                >
                  รายละเอียด
                </label>
                <textarea
                  id={`description-${item.id}`}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="ระบุรายละเอียด..."
                  rows={2}
                  value={item.description}
                  onChange={(e) => {
                    updateRow(item.id, 'description', e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Remove button */}
            {value.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  removeRow(item.id);
                }}
                className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="ลบรายการนี้"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* Add button */}
        <button
          type="button"
          onClick={addRow}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
        >
          + เพิ่มรายการ
        </button>
      </div>
    </div>
  );
}
