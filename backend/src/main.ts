import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ormClient = app.get(OrmClient, { strict: false });
  await ormClient.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT') || 8080);
}
bootstrap();
