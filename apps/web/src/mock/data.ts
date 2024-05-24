import { MockFilling, MockProject } from "./type";
import { FillingStatus } from "../../../shared/constant/enum";
// ADD code

export const mockProject: MockProject = {
  id: "1",
  code: "9000",
  name: "โครงการดูแลเด็กยากไร้ ประจำปีการศึกษา 2555",
  type: "Development",
  objectType: "project",
  status: "Active",
  createdAt: "2023-01-01T00:00:00Z",
  updatedAt: "2023-05-01T00:00:00Z",
};

export const mockProjects: MockProject[] = [
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

export const noMockProjects: MockProject[] = [];

// mock more filling
export const mockFillings: MockFilling[] = [
  {
    id: "1",
    name: "Mock Filling 1",
    status: FillingStatus.APPROVED,
    objectType: "filling",
    code: "9000-0001",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Mock Filling 2",
    status: FillingStatus.RETURNED,
    code: "9000-0002",
    objectType: "filling",
    createdAt: "2023-02-15T00:00:00Z",
  },
  {
    id: "3",
    name: "Mock Filling 3",
    status: FillingStatus.WAIT_FOR_SECRETARY,
    code: "9000-0003",
    objectType: "filling",
    createdAt: "2023-03-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Mock Filling 4",
    status: FillingStatus.WAIT_FOR_STUDENT_AFFAIR,
    objectType: "filling",
    code: "9000-0004",
    createdAt: "2023-04-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Mock Filling 5",
    status: FillingStatus.RETURNED,
    objectType: "filling",
    code: "9000-0005",
    createdAt: "2023-05-20T00:00:00Z",
  },
  {
    id: "6",
    name: "Mock Filling 6",
    objectType: "filling",
    status: FillingStatus.WAIT_FOR_SECRETARY,
    code: "9000-0006",
    createdAt: "2023-06-05T00:00:00Z",
  },
  {
    id: "7",
    name: "Mock Filling 7",
    objectType: "filling",
    status: FillingStatus.APPROVED,
    code: "9000-0007",
    createdAt: "2023-07-25T00:00:00Z",
  },
];

export const noMockFilling: MockFilling[] = [];
