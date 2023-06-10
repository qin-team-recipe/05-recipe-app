import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';

@Module({
  providers: [OrmClient],
  exports: [OrmClient],
})
export class OrmModule {}
