import { Module } from '@nestjs/common';
import { OrmClient } from 'src/infrastructure/orm/orm.client';
import { RecipeRepository } from './repository';

@Module({
  providers: [RecipeRepository, OrmClient],
  exports: [RecipeRepository],
})
export class RecipeRepositoryModule {}
