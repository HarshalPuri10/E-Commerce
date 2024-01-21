import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'; 
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SpinnerService, StorageService } from '../services';
import { ToastService } from '@core/services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  currentRoute: any;
  userDetails: any;
  constructor(
    private storageService: StorageService,
    private toastService: ToastService,
    private router: Router,
    private spinner: SpinnerService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // extract error message from http body if an error occurs
    return next.handle(request).pipe(
      catchError((errorResponse) => {
        this.spinner.hide();
        if (errorResponse instanceof HttpErrorResponse) {
          if (!navigator.onLine) {
            // No Internet connection
            this.toastService.warning('No Internet Connection');
          }

          switch (errorResponse.status) {
            case 401: // login
              // redirect to login page with the return url
              this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((event: any) => {
                  this.currentRoute = event['url'];
                });
              this.userDetails = this.storageService.get('IDMSAUser');
              this.router.navigate(['/auth/login'], {
                queryParams: { returnUrl: this.currentRoute },
              });

              break;
            case 400: // forbidden  show server bad request message
            case 404: // not_found
            case 410: // precondition_failed
            case 412: // precondition_failed
            case 422: // precondition_failed
            case 500: // Internal Server Error
            case 503: // Internal Server Error
              if (errorResponse.error) {
                if (errorResponse.error.error) {
                  this.toastService.error(errorResponse.error.error);
                }
                if (errorResponse.error.message) {
                  this.toastService.error(errorResponse.error?.message);
                }
              }
              break;
          }
        }
        return throwError(errorResponse.error);
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
