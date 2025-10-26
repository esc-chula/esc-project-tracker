// formFields.ts

export const MockFormField = {
  sections: {
    รายละเอียดทั่วไป: {
      project_code: {
        name: 'project_code',
        label: 'เลขรันโครงการ',
        description: 'รูปแบบเช่น 1502-1001 / 2568',
        type: 'string-short',
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
          'ถ้าเป็น "ชมรม/ฝ่าย" ให้ระบุชื่อ ต่อท้าย; ถ้าไม่สังกัด ไม่ต้องเขียน',
        type: 'string-short',
        constraints: [{ rule: 'maxLength', args: 200 }],
        isMultiple: false,
      },
      project_name: {
        name: 'project_name',
        label: 'ชื่อโครงการ (ภาษาอังกฤษ)',
        description: 'Project name in English',
        type: 'string-short',
        constraints: [{ rule: 'required' }, { rule: 'minLength', args: 3 }],
        isMultiple: false,
      },
      project_principle: {
        name: 'project_principle',
        label: 'หลักการและเหตุผล',
        description: 'อธิบายหลักการและเหตุผลในการจัดโครงการนี้',
        type: 'string-long',
        constraints: [{ rule: 'required' }, { rule: 'minLength', args: 50 }],
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
      staff_estimate: {
        name: 'staff_estimate',
        label: 'ประมาณการจำนวนเจ้าหน้าที่',
        description: 'ระบุจำนวนเจ้าหน้าที่ที่ต้องการสำหรับโครงการ',
        type: 'estimate-people',
        variant: 'staff',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      participants_estimate: {
        name: 'participants_estimate',
        label: 'จำนวนผู้ที่คาดว่าจะเข้าร่วมโครงการ',
        description: 'ระบุจำนวนผู้เข้าร่วมตามประเภท',
        type: 'estimate-people',
        variant: 'participants',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      project_objectives: {
        name: 'project_objectives',
        label: 'วัตถุประสงค์ของโครงการ (ข้อย่อย)',
        description: 'ระบุวัตถุประสงค์เป็นข้อๆ พร้อมรายละเอียด',
        type: 'string-2part',
        isMultiple: true,
        constraints: [{ rule: 'required' }],
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
    // Demo section for testing all new component types
    ทดสอบคอมโพเนนต์ใหม่: {
      test_string_short: {
        name: 'test_string_short',
        label: 'ทดสอบ String Short (w-1/2)',
        description: 'ข้อความสั้นๆ ครึ่งความกว้าง',
        type: 'string-short',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      test_string_long: {
        name: 'test_string_long',
        label: 'ทดสอบ String Long (w-full)',
        description: 'ข้อความยาวเต็มความกว้าง สำหรับข้อมูลที่ต้องพิมพ์เยอะ',
        type: 'string-long',
        constraints: [{ rule: 'required' }],
        isMultiple: false,
      },
      test_estimate_staff: {
        name: 'test_estimate_staff',
        label: 'ทดสอบ Estimate People - Staff',
        description: 'ทดสอบการประมาณจำนวนเจ้าหน้าที่',
        type: 'estimate-people',
        variant: 'staff',
        constraints: [],
        isMultiple: false,
      },
      test_estimate_participants: {
        name: 'test_estimate_participants',
        label: 'ทดสอบ Estimate People - Participants',
        description: 'ทดสอบการประมาณจำนวนผู้เข้าร่วม',
        type: 'estimate-people',
        variant: 'participants',
        constraints: [],
        isMultiple: false,
      },
      test_string_2part: {
        name: 'test_string_2part',
        label: 'ทดสอบ String 2-Part',
        description: 'ทดสอบข้อมูล 2 ส่วน (หัวข้อ + รายละเอียด) แบบหลายแถว',
        type: 'string-2part',
        isMultiple: true,
        constraints: [{ rule: 'required' }],
      },
      test_fallback: {
        name: 'test_fallback',
        label: 'ทดสอบ FallBack Component',
        description: 'นี่คือการทดสอบ component ที่ไม่รองรับ',
        type: 'unsupported-type',
        constraints: [],
        isMultiple: false,
      },
    },
  },
};
