import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { log } from 'console';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // logic before the request is handled
    return next.handle().pipe(map(data=> (
      // logic after the request is handled
      { data }
    )))
  }
}
