import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, throwError } from 'rxjs';
import { AlertService } from '../components/alert/alert.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const headerSettings: { [key: string]: string } = {}

  const token = authService.getToken();
  if (token) {
    headerSettings['Authorization'] = 'Bearer ' + token;
  }
  const newHeader = new HttpHeaders(headerSettings);
  // Pass the modified request to the next interceptor or handler
  const modifiedReq = req.clone({
    headers: newHeader
  });
  return next(modifiedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors         
          console.error('Unauthorized request:', err);
          authService.logout();
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }
      alertService.error(`HTTP error: ${err.error.message || err.message}`, { autoClose: true, keepAfterRouteChange: true })
      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
