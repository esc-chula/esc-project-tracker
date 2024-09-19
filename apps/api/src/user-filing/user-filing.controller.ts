import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserFilingService } from './user-filing.service';

@Controller('user-filing')
export class UserFilingController {
  constructor(private readonly userFilingService: UserFilingService) {}

  // TEST API
  @Post('open')
  upsertProject(
    @Body() { userId, filingId }: { userId: string; filingId: string },
  ) {
    return this.userFilingService.userOpenFiling(userId, filingId);
  }

  @Post('orderByLastOpen')
  getOrderByLastOpen(
    @Body() { userId, limit }: { userId: string; limit?: number },
  ) {
    return this.userFilingService.findUserFilingOrderByLastOpen(userId, limit);
  }
}
