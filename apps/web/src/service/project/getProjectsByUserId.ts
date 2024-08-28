// src/service/getProjectsByUserId.ts
import { trpc } from '../../app/trpc';
import type { ProjectWithLastOpen } from '@/src/interface/project'; // Adjust the path as needed

export default async function getProjectsByUserId(
  userId: string,
): Promise<ProjectWithLastOpen[]> {
  try {
    const projectsWithLastOpen = await trpc.project.findProjectsByUserId.query({
      userId,
    });

    return projectsWithLastOpen;
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถดึงข้อมูลโปรเจคได้');
  }
}
