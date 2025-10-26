import React from 'react';

type SubStatus = 'REJECT' | 'PROCESS' | 'APPROVE';

interface DocumentStatusProps {
  statusNumber: number; // 1-5
  subStatus?: SubStatus;
}

/**
 * DocumentStatus - Shows document approval progress
 * statusNumber: 1-5 indicates current stage
 * subStatus: For status 3, determines the color (REJECT=red, PROCESS=yellow, APPROVE=green)
 */
export default function DocumentStatus({
  statusNumber,
  subStatus,
}: DocumentStatusProps) {
  const getStageColor = (stage: number): string => {
    // Stages before current status are green
    if (stage < statusNumber) {
      return 'bg-green-500';
    }

    // Current stage logic
    if (stage === statusNumber) {
      // Special logic for stage 3
      if (stage === 3 && subStatus) {
        switch (subStatus) {
          case 'REJECT':
            return 'bg-red-500';
          case 'PROCESS':
            return 'bg-yellow-500';
          case 'APPROVE':
            return 'bg-green-500';
          default:
            return 'bg-gray-300';
        }
      }
      // For other stages, current stage is blue/active
      return 'bg-blue-500';
    }

    // Future stages are gray
    return 'bg-gray-300';
  };

  const getStageTextColor = (stage: number): string => {
    const bgColor = getStageColor(stage);
    if (bgColor.includes('gray')) return 'text-gray-500';
    return 'text-white';
  };

  const stages = [
    { number: 1, label: 'เริ่มต้น' },
    { number: 2, label: 'ตรวจสอบ' },
    { number: 3, label: 'อนุมัติ' },
    { number: 4, label: 'ประมวลผล' },
    { number: 5, label: 'เสร็จสิ้น' },
  ];

  return (
    <div className="flex items-center justify-between w-full max-w-md mx-auto">
      {stages.map((stage, index) => (
        <React.Fragment key={stage.number}>
          {/* Stage Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                ${getStageColor(stage.number)} ${getStageTextColor(stage.number)}
                transition-all duration-200
              `}
            >
              {stage.number}
            </div>
            <span className="text-xs mt-2 text-gray-600 text-center">
              {stage.label}
            </span>

            {/* Status 3 special indicator */}
            {stage.number === 3 && statusNumber === 3 && subStatus ? (
              <span
                className={`
                text-xs mt-1 px-2 py-1 rounded-full
                ${subStatus === 'REJECT' ? 'bg-red-100 text-red-700' : ''}
                ${subStatus === 'PROCESS' ? 'bg-yellow-100 text-yellow-700' : ''}
                ${subStatus === 'APPROVE' ? 'bg-green-100 text-green-700' : ''}
              `}
              >
                {subStatus === 'REJECT' && 'ถูกปฏิเสธ'}
                {subStatus === 'PROCESS' && 'รอดำเนินการ'}
                {subStatus === 'APPROVE' && 'อนุมัติแล้ว'}
              </span>
            ) : null}
          </div>

          {/* Connector Line */}
          {index < stages.length - 1 && (
            <div
              className={`
              flex-1 h-1 mx-2
              ${stage.number < statusNumber ? 'bg-green-500' : 'bg-gray-300'}
              transition-colors duration-200
            `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
