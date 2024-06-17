/* eslint-disable @typescript-eslint/no-explicit-any -- Necessary for compatibility with the existing codebase */
// TODO: change any to specific type

import type { FilingStatus } from "../constant/enum"
import { Project } from "./project"

export interface Filing {
  id: string
  project: any
  user: any
  name: string
  FilingCode: string
  status: FilingStatus
  type: number
  projectCode: string
  createdAt: string
  updatedAt: string
}
