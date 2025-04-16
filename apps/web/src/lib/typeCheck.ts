/* eslint-disable @typescript-eslint/no-explicit-any -- Needed for type checking functions that accept generic objects */

import type { Filing } from '../interface/filing';
import type { Gendoc } from '../interface/gendoc';
import type { Project } from '../interface/project';

export function isProject(obj: any): obj is Project {
  return 'reserveDate' in obj;
}

export function isFiling(obj: any): obj is Filing {
  return 'filingCode' in obj && 'status' in obj;
}

export function isGendoc(obj: any): obj is Gendoc {
  return 'data' in obj;
}
