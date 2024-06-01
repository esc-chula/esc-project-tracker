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
    });
  }

  @Delete('userLeaveProject')
  deleteUserProject(@Body() obj: DeleteUserProjDTO) {
    return this.userProjService.deleteUserProject({
      obj,
    });
  }
}
