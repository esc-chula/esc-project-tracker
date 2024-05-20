import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TEST API
  @Get('findByUid/:uid')
  findByUserId(@Param('uid') uid: string) {
    return this.userService.findByUserID(uid);
  }
}
