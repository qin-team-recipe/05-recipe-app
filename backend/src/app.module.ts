import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/module/user.module';
import { CustomLoggerModule } from 'src/utils/logger/custom-logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), CustomLoggerModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
