import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from './trpc/trpc.router';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL.endsWith('/')
      ? process.env.CLIENT_URL.slice(0, -1)
      : process.env.CLIENT_URL,
    credentials: true,
  });
  app.use(cookieParser());
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
