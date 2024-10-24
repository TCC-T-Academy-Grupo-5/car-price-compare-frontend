import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");
  const clonedReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}`}}) : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        localStorage.removeItem('token');
      }

      return throwError(() => error);
    }),
  );
};
