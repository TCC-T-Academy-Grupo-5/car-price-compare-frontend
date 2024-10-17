import { HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";
import {Observable, throwError} from 'rxjs';
import {SnackbarService} from "@services/SnackbarService";
import {StatusType} from "@models/enums/statusType";

@Injectable({
  providedIn: 'root'
})
export class ConflictErrorHandlerService implements ErrorHandlerInterface {

  constructor(private snackbar: SnackbarService) {}

  handle(error: HttpErrorResponse): Observable<never> {
    this.snackbar.open('O e-mail já existe em nossa base de dados, por favor tente outro.', StatusType.WARNING);
    return throwError(() => new Error('Conflito.'));
  }
}
