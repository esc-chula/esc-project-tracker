// src/service/getProjectByUserId.ts
import { trpc } from "../app/trpc";
import { ProjectType } from "@/src/interface/project"; // Adjust the path as needed

export default async function getProjectByUserId(
  userId: string
): Promise<ProjectType[]> {
  try {
    const projects = await trpc.findProjectsByUserId.query({ userId });
    return projects;
  } catch (err) {
    alert(err);
    return [];
  }
}
