import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from './project_.service';
import { ProjectType } from '@repo/shared';
import { createProjectDTO } from './project_.dto';
import { Project } from '../entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // TEST API
  @Get('findByUid/:uid')
  findByUserId(@Param('uid') uid: string) {
    return this.projectService.findByUserID(uid);
  }

  @Get('findProjectTypeCount/:type')
  findCountOfProjectType(@Param('type') type: ProjectType) {
    return this.projectService.findCountOfProjectType(type);
  }

  @Get('findAllProjects')
  findAllProjects() {
    return this.projectService.findAllProjects();
  }

  @Post('createProject')
  createProject(@Body() obj: createProjectDTO) {
    return this.projectService.createProject(obj);
  }

  @Post('createOutsideProject')
  createOutsideProject(@Body() obj: createProjectDTO) {
    return this.projectService.createOutsideProject(obj);
  }

  @Post('testSearch')
  findProjectsForSearchBar(@Body() obj: { input: string }) {
    return this.projectService.findProjectsForSearchBar(obj.input);
  }

  @Delete('deleteProject/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Put('updateProject/:id')
  updateProject(
    @Body() updatedProject: Omit<Partial<Project>, 'id'>,
    @Param('id') id: string,
  ) {
    return this.projectService.updateProject(id, updatedProject);
  }
}
