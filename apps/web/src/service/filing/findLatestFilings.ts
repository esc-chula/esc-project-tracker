import type { FilingType } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function findLatestFilings(): Promise<FilingType[]> {
  try {
    const data = await trpc.filing.findLatestFilings.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to find latest filings');
  }
}