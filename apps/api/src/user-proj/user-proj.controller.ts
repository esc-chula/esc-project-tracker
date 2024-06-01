import { Body, Controller, Post } from '@nestjs/common';
import { UserProjService } from './user-proj.service';
import { CreateUserProjDTO } from './user-project.dto';

@Controller('user-proj')
export class UserProjController {
  constructor(private readonly userProjService: UserProjService) {}

  // TEST API
  @Post('userJoinProject')
  createUserProject(@Body() obj: CreateUserProjDTO) {
    console.log('UserProjController.createUserProject', obj);
    return this.userProjService.createUserProject({
      obj,
    });
  }
}
