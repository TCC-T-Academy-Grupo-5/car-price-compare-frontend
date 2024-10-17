import {Injectable} from '@angular/core';
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {SnackbarService} from "@services/SnackbarService";
import {Router} from "@angular/router";
import {StatusType} from "@models/enums/statusType";

@Injectable({
  providedIn: 'root'
})
export class PasswordOrEmailErrorHandlerService implements ErrorHandlerInterface {
  constructor(private snackbar: SnackbarService, private router: Router) {}

  handle(error: HttpErrorResponse): Observable<never> {
    this.snackbar.open('E-mail ou senha inválidos.', StatusType.ERROR);
    return throwError(() => new Error('E-mail ou senha inválidos.'));
  }
}
