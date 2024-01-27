import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';

@Catch()
export class FilterExceptionIntercaptor implements ExceptionFilter {
  private logger: Logger = new Logger(FilterExceptionIntercaptor.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp() as HttpArgumentsHost;
    // const request = ctx.getRequest() as Request;
    const response = ctx.getResponse() as Response;
    const isHttpException = exception instanceof HttpException;
    const status: number = isHttpException ? exception.getStatus() : 500;
    const error: any =
      exception && exception?.message ? exception.message : 'Error';

    return response.status(status).json({ error: error });
  }
}
