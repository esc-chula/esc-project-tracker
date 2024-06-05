import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project_.service';
import { ProjectType } from '../constant/enum';

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
}
