'use client';
import React, { useState } from 'react';
import {
  Sidebar,
  TopBar,
  FormSection,
  MockFormField,
} from '../../components/gendocformcomponents';

export default function GenDocMockPage() {
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});

  const handleFieldChange = (fieldName: string, value: unknown) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = () => {
    // Create question-answer pairs for logging
    const questionAnswers: { question: string; answer: unknown }[] = [];

    Object.entries(MockFormField.sections).forEach(
      ([sectionTitle, sectionFields]) => {
        Object.entries(sectionFields).forEach(([fieldName, field]) => {
          questionAnswers.push({
            question: `${sectionTitle} - ${field.label}`,
            answer: formValues[fieldName] || 'No answer provided',
          });
        });
      },
    );

    console.log('Form Data - Question & Answers:', questionAnswers);
    console.log('Raw Form Values:', formValues);
  };

  return (
    <div className="h-screen bg-neutral-100 text-neutral-900 flex">
      <div className="flex w-full max-w-[1200px] mx-auto gap-5 p-4 h-full">
        <Sidebar />

        <main className="flex-1 h-full flex flex-col">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 h-full flex flex-col">
            <TopBar />

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {Object.entries(MockFormField.sections).map(
                ([sectionTitle, sectionFields]) => (
                  <FormSection
                    key={sectionTitle}
                    title={sectionTitle}
                    fields={sectionFields}
                    values={formValues}
                    onChange={handleFieldChange}
                  />
                ),
              )}

              <div className="mt-4 flex items-center justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  บันทึกฉบับร่าง
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#b51a1a] px-4 py-2 text-sm text-white hover:bg-[#9b1616]"
                  onClick={handleSubmit}
                >
                  ส่งตรวจสอบ
                </button>
              </div>
            </div>
          </div>

          <div className="h-2" />
        </main>
      </div>
    </div>
  );
}
