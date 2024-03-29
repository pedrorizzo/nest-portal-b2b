import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.html) {
          return data.html;
        }
        if (data?.data) {
          return data ?? {};
        } else if (data instanceof String) {
          data = { message: data };
        } else if (!data) {
          return { data: {} };
        }
        return { data };
      }),
    );
  }
}
