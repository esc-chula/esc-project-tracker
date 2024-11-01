import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `Hello World! ${process.env.CLIENT_URL} ${this.configService.get<string>('CLIENT_URL')} ${process.env.BUCKET_NAME} ${this.configService.get<string>('BUCKET_NAME')}`;
  }
}
