import { trpc } from "../app/trpc";
import { ProjectType, ProjectWithLastOpenType } from "../interface/project";

export class ProjectService {
  async findAllProject(): Promise<ProjectType[]> {
    try {
      const data = await trpc.findAllProject.query();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("failed");
    }
  }
  async getProjectByProjectId(projectId: string): Promise<ProjectType | null> {
    try {
      const project = await trpc.getProjectByProjectId.query({ projectId });
      return project;
    } catch (err) {
      console.error(err);
      throw new Error("ไม่สามารถดึงข้อมูลโปรเจคได้");
    }
  }

  async getProjectsByUserId(
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

  async joinProject(userId: string, projectId: string) {
    try {
      const data = await trpc.createUserProject.query({
        userId,
        projectId,
      });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("ไม่สามารถเข้าร่วมโปรเจคได้");
    }
  }

  async leaveProject(userId: string, projectId: string) {
    try {
      const data = await trpc.deleteUserProject.query({
        userId,
        projectId,
      });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("ไม่สามารถออกจากโปรเจคได้");
    }
  }
}
