/* eslint-disable @typescript-eslint/no-explicit-any -- Necessary for compatibility with the existing codebase */

import type { FilingStatus } from '../constant/enum';
import { Project } from './project';
import { User } from './user';

export interface FilingType {
  id: string;
  project: Project | { id: string };
  userId: string;
  name: string;
  FilingCode: string;
  status: FilingStatus;
  type: number;
  projectCode: string;
  createdAt: string;
  updatedAt: string;
}
