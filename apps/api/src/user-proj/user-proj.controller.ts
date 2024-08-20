import { Body, Controller, Delete, Post } from '@nestjs/common';
import { UserProjService } from './user-proj.service';
import { CreateUserProjDTO, DeleteUserProjDTO } from './user-project.dto';

@Controller('user-proj')
export class UserProjController {
  constructor(private readonly userProjService: UserProjService) {}

  // TEST API
  @Post('userJoinProject')
  createUserProject(@Body() obj: CreateUserProjDTO) {
    return this.userProjService.createUserProject({
      obj,
      isUpdatedLastOpen: true,
    });
  }

  @Post('testGetUser')
  findUsersByProjectId(@Body() obj: { projectId: string }) {
    return this.userProjService.findJoinedUsersByProjectId(obj.projectId);
  }

  @Delete('userLeaveProject')
  deleteUserProject(@Body() obj: DeleteUserProjDTO) {
    return this.userProjService.deleteUserProject({
      obj,
    });
  }
}
