import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('Main-Gateway')

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')

  await app.listen(env.port);

  logger.log(`Gateway running on port ${env.port}`)
}
bootstrap();
