import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { ProjectService } from '../project_/project_.service';
import { UserService } from '../user_/user.service';
import { FilingSubType } from '@repo/shared';
import { Gendoc } from '../entities/gendoc.entity';

@Injectable()
export class GendocService {
  constructor(
    @InjectRepository(Gendoc)
    private readonly gendocRepository: Repository<Gendoc>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  findByGendocID(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    return this.gendocRepository.findOne({ where: { id } });
  }

  async findByProjectID(id: string): Promise<Gendoc[]> {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundProject = await this.projectService.findByProjectID(id);
    if (!foundProject) throw new BadRequestException('Project Not Found!');

    const gendocs = await this.gendocRepository
      .createQueryBuilder('gendoc')
      .innerJoinAndSelect('gendoc.project', 'project')
      .where('gendoc.projectId = :id', { id })
      .getMany();
    return gendocs;
  }

  async createGendoc(
    customProjectName: string,
    name: string,
    type: number,
    userId: string,
    filingCode: string,
    subType: FilingSubType | null,
    projectCode: string,
    projectId?: string,
  ) {
    if ((projectId && !isUUID(projectId)) || !isUUID(userId))
      throw new BadRequestException('Ids are not in UUID format.');
    const foundProject = projectId
      ? await this.projectService.findByProjectID(projectId)
      : undefined;
    if (projectId && !foundProject)
      throw new BadRequestException('Project Not Found');

    const foundUser = await this.userService.findByUserID(userId);
    if (!foundUser) throw new BadRequestException('User Not Found');

    const newGendoc = new Gendoc();
    newGendoc.name = name;
    newGendoc.customProjectName = customProjectName;
    newGendoc.filingCode = filingCode;
    newGendoc.type = type;
    newGendoc.projectCode = projectCode;
    newGendoc.userId = userId;
    newGendoc.user = foundUser;
    if (foundProject) newGendoc.project = foundProject;
    if (subType) newGendoc.subType = subType;

    return this.gendocRepository.save(newGendoc);
  }

  async updateGendoc(id: string, gendoc: Partial<Gendoc>) {
    try {
      if (!isUUID(id))
        throw new BadRequestException('Id is not in UUID format.');
      const foundGendoc = await this.findByGendocID(id);
      if (!foundGendoc) throw new BadRequestException('Gendoc Not Found!');

      const updatedGendoc = await this.gendocRepository.save({
        ...foundGendoc,
        ...gendoc,
      });

      return updatedGendoc;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update Gendoc');
    }
  }

  async deleteGendoc(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Id is not in UUID format.');
    const foundGendoc = await this.findByGendocID(id);
    if (!foundGendoc) throw new BadRequestException('Gendoc Not Found!');

    this.gendocRepository.delete(id);

    return foundGendoc;
  }

  async findAllGendoc(): Promise<Gendoc[]> {
    const gendocs = await this.gendocRepository
      .createQueryBuilder('gendoc')
      .leftJoinAndSelect('gendoc.project', 'project')
      .getMany();

    return gendocs;
  }
}
