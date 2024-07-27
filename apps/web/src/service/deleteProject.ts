import { trpc } from "../app/trpc";
import { Project } from "../interface/project";

export default async function deleteProject(projectId: string): Promise<Project | null> {
    try {
        return await trpc.project.deleteProject.mutate({
        projectId,
        });
    } catch (err) {
        console.error(err);
        throw new Error("ไม่สามารถลบโครงการได้");
    }
}