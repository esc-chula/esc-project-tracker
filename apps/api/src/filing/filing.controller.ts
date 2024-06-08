import { Controller, Get, Param } from '@nestjs/common';
import { FilingService } from './filing.service';

@Controller('filing')
export class FilingController {
  constructor(private readonly filingService: FilingService) {}

  @Get('/findByProjID/:ProjID')
  findByProjectID(@Param('ProjID') ProjID: string) {
    return this.filingService.findByProjectID(ProjID);
  }

  @Get('/findByUserID/:userID')
  findByUserID(@Param('userID') userID: string) {
    return this.filingService.findByUserID(userID);
  }

  @Get('/filings')
  findAllfiling() {
    return this.filingService.findAllFiling();
  }
}
