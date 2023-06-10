import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrmModule } from './infrastructure/orm/orm.module';

@Module({
  imports: [ConfigModule.forRoot(), OrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
