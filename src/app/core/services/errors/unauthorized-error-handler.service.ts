import { Injectable } from '@angular/core';
import {SnackbarService} from "@services/SnackbarService";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {StatusType} from "@models/enums/statusType";
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedErrorHandlerService implements ErrorHandlerInterface {
  constructor(private snackbar: SnackbarService, private router: Router) {}

  handle(error: HttpErrorResponse): Observable<never> {
    this.snackbar.open('Erro de autenticação.', StatusType.WARNING);
    setTimeout(() => this.router.navigate(['/login']), 3000);
    return throwError(() => new Error('Autenticação.'));
  }
}
