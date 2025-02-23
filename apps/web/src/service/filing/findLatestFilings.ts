import type { Filing } from '../../interface/filing';
import { trpc } from '../../app/trpc';

export default async function findLatestFilings(): Promise<Filing[]> {
  try {
    const data = await trpc.filing.findLatestFilings.query();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to find latest filings');
  }
}
