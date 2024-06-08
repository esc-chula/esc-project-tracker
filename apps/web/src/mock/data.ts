import { ProjectStatus, FilingStatus, ProjectType } from "../constant/enum";

export const mockFiling = [
  {
    id: "string",
    project: {
      id: "2",
      name: "ชื่อโครงการ แบบยาว มากกกกกกกกกกกกกกก",
      projectCode: "0012",
      type: 1,
      detail: "",
      reserveDate: "",
      status: ProjectStatus.WAIT_FOR_CLOSE,
      createdAt: "",
      updatedAt: "",
    },
    user: {
      id: "string",
      name: "string",
      createdAt: "string",
      updatedAt: "string",
      username: "string",
      studentId: "string",
      password: "string",
    },
    name: "filing's name",
    FilingCode: "0001",
    status: FilingStatus.APPROVED,
    type: 1,
    projectCode: "1001",
    createdAt: "10/06/2567",
    updatedAt: "10/06/2567",
  },
];
export const mockProject = [
  {
    id: "1",
    name: "ชื่อโครงการ อันที่ 1",
    projectCode: "0011",
    type: ProjectType.ARTS_CULTURE_AFFAIR,
    detail: "",
    reserveDate: "",
    status: ProjectStatus.CONTINUE,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "ชื่อโครงการ แบบยาว มากกกกกกกกกกกกกกก",
    projectCode: "0012",
    type: ProjectType.ACADEMICS_AFFAIR,
    detail: "",
    reserveDate: "",
    status: ProjectStatus.WAIT_FOR_CLOSE,
    createdAt: "",
    updatedAt: "",
  },
];
