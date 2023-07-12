import { Prisma } from '@prisma/client';
import { DatabaseConnectionError } from 'src/utils/exception/database-connection.error';
import { QueryExecutionError } from 'src/utils/exception/query-execution.error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prismaErrorHandling = (error: any) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P1001') {
      throw new DatabaseConnectionError(error.message);
    }

    throw new QueryExecutionError(error.message);
  }
};
