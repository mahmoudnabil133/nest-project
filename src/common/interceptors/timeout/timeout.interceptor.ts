import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    
    const ctx = context.switchToHttp();
    let request = ctx.getRequest<Request>();
    const modifiedBody = { ...request.body, username: 'hoda hoda' };
    request = { ...request, body: modifiedBody };
    
    return next.handle().pipe(timeout(3000), catchError(err => {
      if (err instanceof TimeoutError){
        return throwError(()=> new RequestTimeoutException());
      }
      return err;
    }))
  }
}
