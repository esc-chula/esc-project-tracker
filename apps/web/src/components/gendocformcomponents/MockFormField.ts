// formFields.ts

import FallBackComponent from './FallBackComponent';

export const MockFormField = {
  sections: {
    รายละเอียดทั่วไป: {
      project_code: {
        name: 'project_code',
        label: 'เลขรันโครงการ',
        description: 'รูปแบบเช่น 1502-1001 / 2568',
        type: 'string',
        constraints: [
          { rule: 'required' },
          {
            rule: 'pattern',
            args: '^[0-9]{4}-[0-9]{4}\\s*/\\s*[0-9]{4}$',
            message: 'รูปแบบควรเป็น XXXX-XXXX / YYYY',
          },
        ],
        isMultiple: false,
      },
      document_date: {
        name: 'document_date',
        label: 'วันที่ของเอกสาร',
        description: 'เช่น 18 กันยายน 2568 (UI แสดง พ.ศ., data เก็บ ISO)',
        type: 'date',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      issuer_org: {
        name: 'issuer_org',
        label: 'หน่วยงานที่ออกเอกสาร',
        description:
          'ถ้าเป็น “ชมรม/ฝ่าย” ให้ระบุชื่อ ต่อท้าย; ถ้าไม่สังกัด ไม่ต้องเขียน',
        type: 'string',
        constraints: [{ rule: 'maxLength', args: 200 }],
        isMultiple: false,
      },
      project_name: {
        name: 'project_name',
        label: 'ชื่อโครงการ',
        description: '-',
        type: 'string',
        constraints: [{ rule: 'required' }, { rule: 'minLength', args: 3 }],
        isMultiple: false,
      },
    },

    รายละเอียดการขอใช้ลานจอดรถ: {
      use_date: {
        name: 'use_date',
        label: 'วันที่ขอใช้',
        description: 'เช่น วันพุธที่ 1 มิถุนายน พ.ศ. 2566 (UI), data เก็บ ISO',
        type: 'date',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      duty_student_phone: {
        name: 'duty_student_phone',
        label: 'เบอร์โทร นิสิตผู้รับผิดชอบระหว่างและหลังการใช้งาน',
        description: 'รูปแบบ 0xx-xxx-xxxx',
        type: 'tel',
        constraints: [
          { rule: 'required' },
          {
            rule: 'pattern',
            args: '^0\\d{2}-\\d{3}-\\d{4}$',
            message: 'รูปแบบต้องเป็น 0xx-xxx-xxxx',
          },
        ],
        isMultiple: false,
      },
    },

    ตารางเวลาการขอใช้รถ: {
      car_usage_rows: {
        name: 'car_usage_rows',
        label: 'ตารางเวลาการขอใช้รถ',
        description:
          'เพิ่มแถวได้; ถ้ารายละเอียดแต่ละวันต่างกัน ให้คัดลอกตารางต่อวัน',
        type: 'object',
        isMultiple: true,
        columns: {
          time: {
            name: 'time',
            label: 'เวลา',
            type: 'timerange',
            description: 'เช่น 16:00 - 17:00',
            constraints: [{ rule: 'required' }, { rule: 'rangeValid' }],
          },
          car_info: {
            name: 'car_info',
            label: 'ทะเบียนรถ / ยี่ห้อ / สี',
            type: 'string',
            description: 'เช่น กก 1111 โตโยต้า สีดำ',
            constraints: [{ rule: 'required' }],
          },
          place: {
            name: 'place',
            label: 'สถานที่',
            type: 'string',
            description:
              'เช่น ที่จอดรถข้างอาคารวิศวฯ 100 ปี หรือ ที่จอดรถที่ว่าง',
            constraints: [{ rule: 'required' }],
          },
          note: {
            name: 'note',
            label: 'หมายเหตุ',
            type: 'string',
            description: 'optional',
            constraints: [],
          },
        },
      },
    },
    ทดสอบระบบ_FallBackComponent: {
      use_date: {
        name: 'ทดสอบระบบ',
        label: 'ทดสอบระบบจ๊า',
        description: 'ทดสอบระบบน้าาาาาาาาา',
        type: 'aaaa',
      },
    },
  },
};
