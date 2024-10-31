import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `Hello World! ${process.env.REGION} ${this.configService.get<string>('REGION')}`;
  }
}
