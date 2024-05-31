// src/service/getProjectsByUserId.ts
import { trpc } from "../app/trpc";
import { ProjectType, ProjectWithLastOpenType } from "@/src/interface/project"; // Adjust the path as needed

export default async function getProjectsByUserId(
  userId: string
): Promise<ProjectWithLastOpenType[]> {
  try {
    const projectsWithLastOpen = await trpc.findProjectsByUserId.query({
      userId,
    });

    return projectsWithLastOpen;
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถดึงข้อมูลโปรเจคได้");
  }
}
