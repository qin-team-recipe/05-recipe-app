import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService, { strict: false });
  await prismaService.enableShutdownHooks(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT') || 8080);
}
bootstrap();
