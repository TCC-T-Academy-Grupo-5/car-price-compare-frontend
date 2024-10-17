import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SnackbarService} from "@services/SnackbarService";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import { StatusType } from '@models/enums/statusType';
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";

@Injectable({
  providedIn: 'root'
})
export class NotFoundErrorHandlerService implements ErrorHandlerInterface {
  constructor(private snackbar: SnackbarService, private router: Router) {}

  handle(error: HttpErrorResponse): Observable<never> {
    const {WARNING} = StatusType;
    this.snackbar.open('Página não encontrada.', WARNING);
    setTimeout(() => this.router.navigate(['/']), 3000);
    return throwError(() => new Error('Página não encontrada.'));
  }
}
