export enum DocumentStatus {
  APPROVED = 'APPROVED',
  WAIT_FOR_STUDENT_AFFAIR = 'WAIT_FOR_STUDENT_AFFAIR',
  WAIT_FOR_SECRETARY = 'WAIT_FOR_SECRETARY',
  RETURNED = 'RETURNED',
  DRAFT = 'DRAFT',
}

export enum DocumentActivity {
  CREATE = 'CREATE', // User Only
  REPLY = 'REPLY', // Admin Only
  EDIT = 'EDIT', // Both
}
