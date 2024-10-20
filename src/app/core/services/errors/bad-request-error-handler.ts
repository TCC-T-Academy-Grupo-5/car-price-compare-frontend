import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SnackbarService} from '@services/SnackbarService';
import {StatusType} from "@domain/utils/statusType";
import {ErrorHandlerInterface} from "./error-handler-interface";

@Injectable({
  providedIn: 'root',
})
export class BadRequestErrorHandler implements ErrorHandlerInterface {
  constructor(private snackbar: SnackbarService) {}

  handle(error: HttpErrorResponse): Observable<never> {
    console.error(error.message);
    this.snackbar.open('Solicitação inválida! Verifique os dados e tente novamente.', StatusType.WARNING);
    return throwError(() => new Error('Solicitação inválida.'));
  }
}
