import { trpc } from "../app/trpc";
import { FilingStatus } from "../constant/enum";
import { FilingType } from "../interface/filing";
import { ProjectType } from "../interface/project";

export class FilingService {
  async createFiling(
    projectId: string,
    filingName: string,
    filingType: number
  ): Promise<FilingType> {
    try {
      const data = await trpc.createFiling.query({
        projectId,
        filingName,
        filingType,
      });

      return data;
    } catch (err) {
      console.log(err);
      throw new Error("ไม่สามารถสร้างเอกสารได้");
    }
  }

  async deleteFiling(filingId: string): Promise<FilingType | null> {
    try {
      const data = await trpc.deleteFiling.query({ filingId });
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("ไม่สามารถลบเอกสารได้");
    }
  }

  async findAllFiling() {
    try {
      const data = await trpc.findAllFiling.query();
      return data;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to fetch filing");
    }
  }

  async getFilingByProjectId({
    projectId,
  }: {
    projectId: string;
  }): Promise<FilingType[]> {
    try {
      const data = await trpc.findFilingsByProjectId.query({ projectId });
      return data;
    } catch (err) {
      console.log(err);
      throw new Error("ไม่สามารถดึงข้อมูลเอกสารได้");
    }
  }

  async getFilingsByUserId(userId: string): Promise<FilingType[]> {
    try {
      const data = await trpc.findFilingsByUserId.query({ userId });
      return data;
    } catch (err) {
      console.error(err);
      throw new Error("ไม่สามารถดึงข้อมูลเอกสารได้");
    }
  }

  async updateFilingName({
    filingId,
    filingName,
    filingStatus,
  }: {
    filingId: string;
    filingName: string;
    filingStatus?: FilingStatus;
  }): Promise<FilingType | null> {
    try {
      const data = await trpc.updateFilingName.query({
        filingId,
        filingName,
      });

      return data;
    } catch (e) {
      console.error(e);
      throw new Error("ไม่สามารถอัพเดทชื่อเอกสารได้");
    }
  }
}
