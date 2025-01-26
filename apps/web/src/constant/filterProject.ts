import { filterProjectStatus } from '../styles/enumMap';
import { projectTypeMap } from './map';

export const statusProjectItems = [
  {
    label: 'สถานะ',
    value: 'ALL',
  },
  ...filterProjectStatus,
];

export const departmentProjectItems = [
  {
    label: 'ฝ่าย',
    value: 'ALL',
  },
  ...projectTypeMap,
];
