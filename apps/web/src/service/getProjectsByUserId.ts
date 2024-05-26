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

    console.log("This is projectsWithLastOpen", projectsWithLastOpen);
    return projectsWithLastOpen;
  } catch (err) {
    alert(err);
    return [];
  }
}