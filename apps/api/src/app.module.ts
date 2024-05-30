import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TrpcModule } from './trpc/trpc.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { UserModule } from './user_/user.module';
import { DocumentModule } from './document_/document.module';
import { ProjectModule } from './project_/project_.module';
import { FilingModule } from './filing/filing.module';
import { UserProjService } from './user-proj/user-proj.service';
import { UserProjController } from './user-proj/user-proj.controller';
import { UserProjModule } from './user-proj/user-proj.module';
import { CountFilingModule } from './count-filing/count-filing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [join(__dirname, '**/*.entity.{ts,js}')],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    TrpcModule,
    UserModule,
    DocumentModule,
    ProjectModule,
    FilingModule,
    UserProjModule,
    CountFilingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
