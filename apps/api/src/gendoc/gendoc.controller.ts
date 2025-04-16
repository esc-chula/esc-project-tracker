import { Controller, Get, Param } from '@nestjs/common';
import { GendocService } from './gendoc.service';

@Controller('gendoc')
export class GendocController {
  constructor(private readonly gendocService: GendocService) {}

  @Get('/findByProjID/:ProjID')
  findByProjectID(@Param('ProjID') ProjID: string) {
    return this.gendocService.findByProjectID(ProjID);
  }

  @Get('/findAllGendocs')
  findAllGendoc() {
    return this.gendocService.findAllGendoc();
  }
}
