import { FilingStatus } from "../constant/enum";
import { FilingType } from "../interface/filing";
import { ProjectType } from "../interface/project";
// ADD code

export const mockProject: ProjectType = {
  id: "1",
  projectCode: "9000",
  name: "โครงการดูแลเด็กยากไร้ ประจำปีการศึกษา 2555",
  type: 1,
  detail: "kkk",
  status: "Active",
  reserveDate: "2023-01-01T00:00:00Z",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-05-01T00:00:00Z",
};
/*

export const mockProjects: ProjectType[] = [
  {
    id: "1",
    code: "9000",
    name: "โครงการดูแลเด็กยากไร้ ประจำปีการศึกษา 2555",
    type: "Development",
    status: "Active",
    objectType: "project",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-05-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Mock  2",
    code: "8002",
    type: "Research",
    objectType: "project",
    status: "Completed",
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2023-06-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Mock Project 3",
    code: "1005",
    type: "Marketing",
    objectType: "project",
    status: "Active",
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-07-05T00:00:00Z",
  },
  {
    id: "4",
    name: "Mock Project 4",
    type: "Design",
    code: "1500",
    objectType: "project",
    status: "Pending",
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2023-08-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Mock Project 5",
    code: "8000",
    type: "Development",
    status: "Inactive",
    objectType: "project",
    createdAt: "2023-05-20T00:00:00Z",
    updatedAt: "2023-09-15T00:00:00Z",
  },
  {
    id: "6",
    name: "Mock Project 6",
    type: "Research",
    code: "9005",

    objectType: "project",
    status: "Active",
    createdAt: "2023-06-05T00:00:00Z",
    updatedAt: "2023-10-10T00:00:00Z",
  },
  {
    id: "7",
    name: "Mock Project 7",
    type: "Marketing",
    code: "9006",
    objectType: "project",
    status: "Completed",
    createdAt: "2023-07-25T00:00:00Z",
    updatedAt: "2023-11-01T00:00:00Z",
  },
];
*/
export const noMockProjects: ProjectType[] = [];

// mock more Filing
export const mockFilings: FilingType[] = [
  {
    id: "1",
    name: "Mock Filing 1",
    FilingCode: "9000-0001",
    user: "1",
    project: "1",
    status: FilingStatus.WAIT_FOR_SECRETARY,
    projectCode: "9000",
    updatedAt: "2023-05-01T00:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "1",
    name: "Mock Filing 1",
    FilingCode: "9000-0001",
    user: "1",
    project: "1",
    status: FilingStatus.WAIT_FOR_SECRETARY,
    projectCode: "9000",
    updatedAt: "2023-05-01T00:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "1",
    name: "Mock Filing 1",
    FilingCode: "9000-0001",
    user: "1",
    project: "1",
    status: FilingStatus.WAIT_FOR_SECRETARY,
    projectCode: "9000",
    updatedAt: "2023-05-01T00:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
];

export const noMockFiling: FilingType[] = [];
