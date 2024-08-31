export interface UserAuthResponse {
  studentId: string;
  name: {
    en: {
      firstName: string;
      lastName: string;
    };
    th: {
      firstName: string;
      lastName: string;
    };
  };
}
