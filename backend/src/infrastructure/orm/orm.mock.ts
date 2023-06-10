import createPrismaMock from 'prisma-mock';
import { OrmClient } from './orm.client';

export const createOrmMock = createPrismaMock() as OrmClient;
