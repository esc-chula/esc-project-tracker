import { trpc } from "../app/trpc";

export default async function updateLastOpen({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) {
  try {
    await trpc.updateUserProjLastOpen.query({
      userId,
      projectId,
    });
  } catch (err) {
    alert(err);
  }
}
