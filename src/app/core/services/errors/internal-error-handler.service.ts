import {Injectable} from '@angular/core';
import {SnackbarService} from "@services/SnackbarService";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {StatusType} from "@domain/utils/statusType";
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";

@Injectable({
  providedIn: 'root'
})
export class InternalErrorHandlerService implements ErrorHandlerInterface {
  constructor(private snackbar: SnackbarService) {}

  handle(error: HttpErrorResponse): Observable<never> {
    this.snackbar.open('Ocorreu um erro interno no servidor.', StatusType.ERROR);
    console.error(error.message);
    return throwError(() => new Error('Erro interno.'));
  }
}
