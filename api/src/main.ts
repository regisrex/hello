import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import * as morgan from 'morgan';
import { env } from 'process';
import { json } from 'express'
declare const module: any;
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://pandora-monorepo-web.vercel.app'],
  });
  app.use(json({
    limit: "20mb"
  }))
  app.use(morgan("short"))

  await app.listen(env.PORT);
  app.useLogger(new Logger());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
