import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProjectService } from './project_.service';
import { ProjectType } from '../constant/enum';
import { createProjectDTO } from './project_.dto';

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
}
