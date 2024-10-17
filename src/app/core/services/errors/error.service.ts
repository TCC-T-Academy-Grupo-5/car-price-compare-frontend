import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotFoundErrorHandlerService} from "@services/errors/not-found-error-handler.service";
import {UnauthorizedErrorHandlerService} from "@services/errors/unauthorized-error-handler.service";
import {BadRequestErrorHandler} from "@services/errors/bad-request-error-handler";
import {InternalErrorHandlerService} from "@services/errors/internal-error-handler.service";
import {DefaultErrorHandlerService} from "@services/errors/default-error-handler.service";
import {ErrorHandlerInterface} from "@services/errors/error-handler-interface";
import {PasswordOrEmailErrorHandlerService} from "@services/errors/password-or-email-error-handler.service";

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorHandlers: { [key: number]: ErrorHandlerInterface } = {};

  constructor(
    private notFoundHandler: NotFoundErrorHandlerService,
    private unauthorizedHandler: UnauthorizedErrorHandlerService,
    private badRequestHandler: BadRequestErrorHandler,
    private internalServerErrorHandler: InternalErrorHandlerService,
    private defaultHandler: DefaultErrorHandlerService,
    private passwordOrEmailError: PasswordOrEmailErrorHandlerService,

  ) {
    this.errorHandlers[404] = this.notFoundHandler;
    this.errorHandlers[401] = this.unauthorizedHandler;
    this.errorHandlers[400] = this.badRequestHandler;
    this.errorHandlers[500] = this.internalServerErrorHandler;
    this.errorHandlers[409] = this.passwordOrEmailError;
    this.errorHandlers[422] = this.passwordOrEmailError;
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    const handler = this.errorHandlers[error.status] || this.defaultHandler;
    return handler.handle(error);
  }
}
