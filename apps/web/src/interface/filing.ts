/* eslint-disable @typescript-eslint/no-explicit-any -- Necessary for compatibility with the existing codebase */

import type { FilingStatus } from '../constant/enum';
import { Project } from './project';

export interface FilingType {
  id: string;
  project: Project | { id: string };
  user: any;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
