import { trpc } from "../app/trpc";

export default async function getFilingByUserId(userId: string) {
  try {
    const fillings = await trpc.findFilingsByUserId.query({
      userId,
    });

    return fillings;
  } catch (err) {
    alert(err);
    return [];
  }
}
