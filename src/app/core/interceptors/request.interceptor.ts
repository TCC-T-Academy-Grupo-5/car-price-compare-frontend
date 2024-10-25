import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '@services/auth.service';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem("token");
  const isTokenExpired = authService.isTokenExpired(token);

  if (token && !isTokenExpired) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
