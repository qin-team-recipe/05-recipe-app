import { Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    prettyPrint: process.env.NODE_ENV !== 'production',
  });

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(error: Error, ...optionalParams: any[]) {
    this.logger.error(
      `Error: ${error.message}\nStack Trace:\n${error.stack}`,
      ...optionalParams,
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(message, ...optionalParams);
  }
}
