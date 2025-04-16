import { trpc } from '../../app/trpc';

export default async function findAllGendoc() {
  try {
    const data = await trpc.gendoc.findAllGendoc.query();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error('Failed to fetch Gendoc');
  }
}
