import { trpc } from "../app/trpc";

export default async function getFilingByUserId(userId: string) {
  try {
    const fillings = await trpc.findFilingsByUserId.query({
      userId,
    });

    return fillings;
  } catch (err) {
    console.log(err);

    throw new Error("ไม่สามารถดึงข้อมูลเอกสารได้");
  }
}
